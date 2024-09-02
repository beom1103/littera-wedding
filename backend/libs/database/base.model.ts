import { Repository, DeepPartial, EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Injectable } from "@nestjs/common";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export abstract class BaseModel<T extends {}> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>, manager?: EntityManager, lockForUpdate: boolean = false): Promise<T[]> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    const queryBuilder = repo.createQueryBuilder();

    if (options) {
      queryBuilder.setFindOptions(options);
    }

    if (lockForUpdate) {
      queryBuilder.setLock("pessimistic_write");
    }

    return queryBuilder.getMany();
  }

  async findOne(options: FindOneOptions<T>, manager?: EntityManager, lockForUpdate: boolean = false): Promise<T | null> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    const queryBuilder = repo.createQueryBuilder();

    if (options) {
      queryBuilder.setFindOptions(options);
    }

    if (lockForUpdate) {
      queryBuilder.setLock("pessimistic_write");
    }

    return queryBuilder.getOne();
  }

  async create(data: DeepPartial<T>, manager?: EntityManager): Promise<T> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    const entity = repo.create(data);
    return repo.save(entity);
  }

  async createBulk(data: DeepPartial<T>[], manager?: EntityManager): Promise<T[]> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    const entities = repo.create(data);
    return repo.save(entities);
  }

  async update(criteria: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>, manager?: EntityManager): Promise<void> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    await repo.update(criteria, data);
  }

  async updateBulk(data: { criteria: FindOptionsWhere<T>; update: QueryDeepPartialEntity<T> }[], manager?: EntityManager): Promise<void> {
    for (const { criteria, update } of data) {
      await this.update(criteria, update, manager);
    }
  }

  async delete(criteria: FindOptionsWhere<T>, manager?: EntityManager): Promise<void> {
    const repo = manager ? manager.getRepository(this.repository.target) : this.repository;
    await repo.delete(criteria);
  }

  async paginate(
    page: number,
    limit: number,
    options?: FindManyOptions<T>,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      ...options,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async transaction<R>(operation: (manager: EntityManager) => Promise<R>, manager?: EntityManager): Promise<R> {
    if (manager) {
      return operation(manager);
    }
    return this.repository.manager.transaction(operation);
  }
}
