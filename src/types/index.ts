export enum OrderTypeType {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortPostOptionsType = {
  orderType: OrderTypeType;
  orderBy: any;
};
