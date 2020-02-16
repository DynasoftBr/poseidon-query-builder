import { QueryBuilderFunc, IncludableQueryBuilderFunc } from "../src/pipelines/query/common/parse-query";
import { IMatchBuilder } from "./imatch-builder";
import { MatchBuilder } from "./match-builder";
import { WhereOp, IQueryModel } from "./query-model";
export class IncludableQueryBuilder implements IMatchBuilder {
  matchBuilder = new MatchBuilder();
  private readonly query: IQueryModel = {};

  where(field: string, op: WhereOp, value: any): this {
    this.matchBuilder.where(field, op, value);
    return this;
  }

  whereFields(field1: string, op: WhereOp, field2: string): this {
    this.matchBuilder.whereFields(field1, op, field2);
    return this;
  }

  or(...queries: QueryBuilderFunc[]): this {
    this.matchBuilder.or(...queries);
    return this;
  }

  include(entityType: string, query: IncludableQueryBuilderFunc) {
    this.query.$include = this.query.$include || {};
    this.query.$include[entityType] = query(new IncludableQueryBuilder()).getResult();
    return this;
  }

  getResult(): IQueryModel {
    this.query.$match = this.matchBuilder.getResult();
    return this.query;
  }
}
