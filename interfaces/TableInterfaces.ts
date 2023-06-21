export interface ITableRowDealer {
  firstName: string;
  lastName: string;
  telephone: number;
  debts: number;
}

export interface ITableDealer {
  rows: ITableRowDealer[]
  headingName: string
  headingPhone: string
  headingDebt: string
}
