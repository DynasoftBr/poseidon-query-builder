import { IMatch, WhereOp } from "./query-model";
import { MatchBuilder } from "./match-builder";
import { IncludableQueryBuilder } from "./includable-query-builder";

export type QueryBuilderFunc = (q: MatchBuilder) => MatchBuilder;
export type IncludableQueryBuilderFunc = (q: IncludableQueryBuilder) => IncludableQueryBuilder;

export interface IMatchBuilder {
  where(field: string, op: WhereOp, value: any): this;
  whereFields(field1: string, op: WhereOp, field2: string): this;
  or(...queries: QueryBuilderFunc[]): this;
}
