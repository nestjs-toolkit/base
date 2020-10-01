import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { MaybeModelWithOld, ModelWithOld } from './types';
import { uniqueIds } from '../helpers';
import { ModelNotFoundException } from '../exceptions/ModelNotFoundException';

export abstract class AbstractRepository<
  TModel extends Document,
  TRequest = any
> {
  protected constructor(protected readonly model: Model<TModel>) {}

  abstract async delete(model: TModel, req?: TRequest): Promise<boolean>;

  abstract async update(
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

  async find(_id: any): Promise<TModel | null> {
    const conditions = this.createQueryObject({ _id });
    return this.model.findOne(conditions).exec();
  }

  async findOrFail(_id: any): Promise<TModel> {
    const model = await this.find(_id);

    if (!model) {
      throw new ModelNotFoundException();
    }

    return model;
  }

  async findByIds(ids: ReadonlyArray<any>) {
    const conditions = this.createQueryObject({ _id: { $in: uniqueIds(ids) } });

    return this.model
      .find(conditions)
      .limit(ids.length)
      .exec();
  }

  async loadMany(ids: ReadonlyArray<any>) {
    const categories = await this.findByIds(ids);

    return ids.map(id => categories.find(category => category._id.equals(id)));
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

    return Promise.all(models.map(model => this.update(model, dto, req)));
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

    return Promise.all(models.map(model => this.delete(model, req)));
  }
}
