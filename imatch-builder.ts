import { QueryBuilderFunc } from "../src/pipelines/query/common/parse-query";
import { IMatch, WhereOp } from "./query-model";
export interface IMatchBuilder {
  where(field: string, op: WhereOp, value: any): this;
  whereFields(field1: string, op: WhereOp, field2: string): this;
  or(...queries: QueryBuilderFunc[]): this;
}
