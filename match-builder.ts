import { QueryBuilderFunc } from "../src/pipelines/query/common/parse-query";
import { IMatchBuilder } from "./imatch-builder";
import { WhereOp, IMatch } from "./query-model";

export class MatchBuilder implements IMatchBuilder {
  private readonly query: IMatch = {};

  where(field: string, op: WhereOp, value: any): this {
    this.query[field] = {};
    this.query[field][op] = value;
    return this;
  }

  whereFields(field1: string, op: WhereOp, field2: string) {
    this.query.$expr = this.query.$expr || {};
    this.query.$expr[op] = [field1, field2];
    return this;
  }

  or(...queries: QueryBuilderFunc[]) {
    if (!queries || queries.length) return this;
    this.query.$or = queries.map(q => q(new MatchBuilder()).query);
    return this;
  }

  skip(num: number) {
    this.query.$skip = num;
    return this;
  }

  limite(num: number) {
    this.query.$limit = num;
    return this;
  }

  getResult() {
    return this.query;
  }
}
