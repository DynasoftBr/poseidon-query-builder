export type WhereOp = "$eq" | "$gt" | "$gte" | "$in" | "$lt" | "$lte" | "$ne" | "$nin";
export interface IQueryModel {
  $match?: IMatch;
  $include?: { [key: string]: IQueryModel };
}

export type IMatch = IMatchBase & { [key: string]: { [key in WhereOp]?: any } };
interface IMatchBase {
  $or?: IMatch[];
  $limit?: number;
  $skip?: number;
  $expr?: { [key in WhereOp]?: string[] };
}
