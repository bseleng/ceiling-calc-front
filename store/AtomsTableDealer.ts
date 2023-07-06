import { atom } from 'jotai';
import { ITableDealerRow, ITableDealerSorting } from '../interfaces';

export const ATableDealerRows = atom<ITableDealerRow[]>([]);

export const ATableDealerSortDirections = atom<ITableDealerSorting>({
  lastName: 'none',
  debts: 'none',
});
