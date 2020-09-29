export type ModelWithOld<TModel, TDto = any> = {
  // model: DocumentQuery<TModel | null, TModel>;
  model: TModel;
  old: TDto;
  isNew: boolean;
};

export type MaybeModelWithOld<TModel, TDto = any> = {
  // model: DocumentQuery<TModel | null, TModel>;
  model: TModel | null;
  old: TDto;
  isNew: boolean;
};
