import { atom } from 'jotai';
import { ITableDealerHeadingSortable, ITableDealerRow, ITableDealerSorting } from '../interfaces';

export const ATableDealerRows = atom<ITableDealerRow[]>([]);

export const ATableDealerSortDirections = atom<ITableDealerSorting>({
  lastName: 'none',
  debts: 'none',
  city: 'none',
});

export const ATableDealerActiveSortColumn = atom<ITableDealerHeadingSortable | ''>('');