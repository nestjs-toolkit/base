import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { uniqueIds } from '../utils';
import { ModelNotFoundException } from '../exceptions';
import { MaybeModelWithOld, ModelWithOld } from './types';

export abstract class AbstractRepository<
  TModel extends Document,
  TRequest = any,
> {
  protected constructor(protected readonly model: Model<TModel>) {}

  abstract delete(model: TModel, req?: TRequest): Promise<boolean>;

  abstract update(
    model: TModel,
    dto: any,
    req?: TRequest,
  ): Promise<MaybeModelWithOld<TModel>>;

  protected createQueryObject<T = TModel>(initial?: any): FilterQuery<T> {
    return Object.assign({}, initial);
  }

  async upsert(
    conditions: FilterQuery<TModel>,
    data: UpdateQuery<TModel>,
  ): Promise<ModelWithOld<TModel>> {
    const doc = await this.model.findOneAndUpdate(
      conditions, // find a document with that filter
      data, // document to insert when nothing was found
      {
        upsert: true,
        new: false,
        runValidators: true,
        setDefaultsOnInsert: true,
      }, // options
    );

    if (doc) {
      const old = doc.toJSON();
      return {
        model: doc.set(data),
        old,
        isNew: false,
      };
    }

    const model = new this.model(data);
    const dateTime = new Date(model._id.getTimestamp());

    model.set({
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    return {
      model,
      old: {},
      isNew: true,
    };
  }

  async updateOne(
    conditions: FilterQuery<TModel>,
    data: UpdateQuery<TModel>,
  ): Promise<MaybeModelWithOld<TModel>> {
    const doc = await this.model.findOneAndUpdate(
      conditions, // find a document with that filter
      data, // document to insert when nothing was found
      { upsert: false, new: false, runValidators: true }, // options
    );

    if (doc) {
      const old = doc.toJSON();
      return {
        model: doc.set(data),
        old,
        isNew: false,
      };
    }

    return {
      model: null,
      old: {},
      isNew: false,
    };
  }

  // todo fix type
  async find(_id: any, population?: any): Promise<any> {
    const conditions = this.createQueryObject({ _id });
    const query = this.model.findOne(conditions);

    if (population) {
      return query.populate(population).exec();
    }

    return query.exec();
  }

  async findOrFail(_id: any, population?: any): Promise<TModel> {
    const model = await this.find(_id, population);

    if (!model) {
      throw new ModelNotFoundException();
    }

    return model;
  }

  async findByIds(ids: ReadonlyArray<any>, population?: any) {
    const conditions = this.createQueryObject({ _id: { $in: uniqueIds(ids) } });

    const query = this.model.find(conditions).limit(ids.length);

    if (population) {
      query.populate(population);
    }

    return query.exec();
  }

  async loadMany(ids: ReadonlyArray<any>, population?: any) {
    const models = await this.findByIds(ids, population);

    return ids.map((id) => models.find((model) => model._id.equals(id)));
  }

  async updateByID(
    _id: any,
    dto: any,
    req?: TRequest,
  ): Promise<MaybeModelWithOld<TModel>> {
    const model = await this.findOrFail(_id);
    return this.update(model, dto, req);
  }

  async updateManyByID(
    ids: any[],
    dto: any,
    req?: TRequest,
  ): Promise<MaybeModelWithOld<TModel>[]> {
    const models = await this.findByIds(ids);

    if (!models.length) {
      throw new ModelNotFoundException();
    }

    return Promise.all(models.map((model) => this.update(model, dto, req)));
  }

  async deleteByID(_id: any, req?: TRequest): Promise<boolean> {
    const model = await this.find(_id);
    return this.delete(model, req);
  }

  async deleteManyByID(ids: any[], req?: TRequest): Promise<boolean[]> {
    const models = await this.findByIds(ids);

    if (!models.length) {
      throw new ModelNotFoundException();
    }

    return Promise.all(models.map((model) => this.delete(model, req)));
  }
}
