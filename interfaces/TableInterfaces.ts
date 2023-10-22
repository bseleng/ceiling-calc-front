export type ITableDealerRow = {
  id: number;
  firstName: string;
  lastName: string;
  telephone: '' | number;
  debts: number;
  city: string;
};

export type ITableDealerRowValue = ITableDealerRow[keyof ITableDealerRow];

export type ITableDealerHeading = keyof ITableDealerRow;
export type ITableDealerHeadingSortable = Exclude<
  ITableDealerHeading,
  'firstName' | 'telephone' | 'id'
>;
export type ITableDealerHeadingEditable = Extract<ITableDealerHeading, 'telephone' | 'debts'>;

export interface ITableDealer {
  rows: ITableDealerRow[];
}

export type ITableSortDirection = 'none' | 'desc' | 'asc';
export type ITableSortIcon = 'sortNumber' | 'sortText';

export type ITableDealerSorting = Record<ITableDealerHeadingSortable, ITableSortDirection>;

export type ITableUpdateDealerField = {
  dealerId: number;
  path: ITableDealerHeadingEditable;
  value: ITableDealerRowValue;
};
