import {
  Model,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  UpdateQuery,
  HydratedDocument,
} from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<HydratedDocument<T>> {
    const doc = new this.model(item);
    return (await doc.save()) as unknown as HydratedDocument<T>;
  }

  public async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(filter, projection, options) as unknown as Promise<HydratedDocument<T> | null>;
  }

  public async update(
    filter: QueryFilter<T>,
    updateQuery: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndUpdate(filter, updateQuery, options) as unknown as Promise<HydratedDocument<T> | null>;
  }

  public async getAll(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<HydratedDocument<T>[]> {
    return this.model.find(filter, projection, options) as unknown as Promise<HydratedDocument<T>[]>;
  }
  async count(filter: QueryFilter<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
