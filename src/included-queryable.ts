import { Query } from "./interfaces/query";
import { IncludeBuilder, QueryBuilder } from "./interfaces/query-builder";
import { AggregateBuilder, FilterBuilderInterface, HavingBuilder, IncludableKeys, Included } from "./interfaces/utility-types";
import { Queryable } from "./queryable";

export class IncludedQueryable<T, TRoot = T, TResult = T, Paginated = false> implements QueryBuilder<T, TRoot, TResult, Paginated> {
  private queryable: Queryable<T, TRoot, TResult, Paginated>;

  constructor(public readonly _query: Query<T> = {}) {
    this.queryable = new Queryable(null, _query);
  }

  include<K extends IncludableKeys<T>>(key: K): IncludedQueryable<T, TRoot, Included<T, TResult, K>, Paginated>;
  include<K extends IncludableKeys<T>, R>(
    key: K,
    i?: IncludeBuilder<T, TRoot, K, R>
  ): IncludedQueryable<T, TRoot, Included<T, TResult, K, R>, Paginated> {
    const newIncludedable = new IncludedQueryable<T, TRoot, Included<T, TResult, K, R>, Paginated>();
    newIncludedable.queryable = this.queryable.include(key, i);
    return newIncludedable;
  }

  filter(func: (builder: FilterBuilderInterface<T, TRoot>) => void): IncludedQueryable<T, TRoot, TResult, Paginated> {
    const newIncludedable = new IncludedQueryable<T, TRoot, TResult, Paginated>();
    newIncludedable.queryable = this.queryable.filter(func);
    return newIncludedable;
  }

  having(func: (builder: HavingBuilder<T>) => void): IncludedQueryable<T, TRoot, TResult, Paginated> {
    const newIncludedable = new IncludedQueryable<T, TRoot, TResult, Paginated>();
    newIncludedable.queryable = this.queryable.having(func);
    return newIncludedable;
  }

  aggregate<Agg>(func: (builder: AggregateBuilder<T>) => AggregateBuilder<T, Agg>): IncludedQueryable<T, TRoot, Agg, Paginated> {
    const newIncludedable = new IncludedQueryable<T, TRoot, Agg, Paginated>();
    newIncludedable.queryable = this.queryable.aggregate(func);
    return newIncludedable;
  }

  select<K extends keyof TResult>(...keys: K[]): IncludedQueryable<T, TRoot, Pick<TResult, K>, Paginated> {
    const newIncludedable = new IncludedQueryable<T, TRoot, Pick<TResult, K>, Paginated>();
    newIncludedable.queryable = this.queryable.select(...keys);
    return newIncludedable;
  }

  paginate(skip: number, take: number): IncludedQueryable<T, TRoot, TResult, true> {
    const newIncludedable = new IncludedQueryable<T, TRoot, TResult, true>();
    newIncludedable.queryable = this.queryable.paginate(skip, take);
    return newIncludedable;
  }

  recursive(): IncludedQueryable<T, TRoot, TResult, Paginated>{
    this._query.$recursive = true;
    return this;
  }
}
