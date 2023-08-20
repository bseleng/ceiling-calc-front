import {
  ITableDealerHeadingSortable,
  ITableDealerRow,
  ITableDealerSorting,
  ITableSortDirection,
} from '../../../../interfaces';

export const getNextSortDirection = (
  currentSortDirection: ITableSortDirection
): ITableSortDirection => {
  switch (currentSortDirection) {
    case 'none':
      return 'desc';
    case 'desc':
      return 'asc';
    case 'asc':
      return 'none';
  }
};

export const sortNumericValues = (
  rows: ITableDealerRow[],
  column: ITableDealerHeadingSortable,
  newSortDirection: ITableSortDirection
): ITableDealerRow[] => {
  const draftRows = [...rows];
  draftRows.sort((a, b) => {
    const firstValue = a[column] as number;
    const secondValue = b[column] as number;

    if (firstValue !== 0 && secondValue === 0) return -1;
    if (firstValue === 0 && secondValue !== 0) return 1;
    return 0;
  });

  draftRows.sort((a, b) => {
    const firstValue = a[column] as number;
    const secondValue = b[column] as number;

    switch (newSortDirection) {
      case 'none':
        return 0;
      case 'desc':
        return firstValue - secondValue;
      case 'asc':
        return secondValue - firstValue;
      default:
        return 0;
    }
  });
  return draftRows;
};

export const sortTextValues = (
  rows: ITableDealerRow[],
  column: ITableDealerHeadingSortable,
  newSortDirection: ITableSortDirection
): ITableDealerRow[] => {
  const draftRows = [...rows];

  /*
    TODO: add two-column sort option ex: LastName + FirstName
        не учтена сортировка по двум колонкам, например Фамилия + Имя
    */
  draftRows.sort((a, b) => {
    const firstValue = a[column] as string;
    const secondValue = b[column] as string;

    const firstValueCap = firstValue.toUpperCase();
    const secondValueCap = secondValue.toUpperCase();

    switch (newSortDirection) {
      case 'none':
        return 0;
      case 'desc':
        if (firstValueCap > secondValueCap) {
          return 1;
        }
        if (firstValueCap < secondValueCap) {
          return -1;
        }
      case 'asc':
        if (secondValueCap > firstValueCap) {
          return 1;
        }
        if (secondValueCap < firstValueCap) {
          return -1;
        }
      default:
        return 0;
    }
  });
  return draftRows;
};

export const setTableDealerSort = (
  currentSort: ITableDealerSorting,
  columnToSort: ITableDealerHeadingSortable
): ITableDealerSorting => {
  const prevSortDirection = currentSort[columnToSort];
  const draftSort = { ...currentSort };
  const sortableColumns = Object.keys(currentSort) as ITableDealerHeadingSortable[];

  sortableColumns.map((column: ITableDealerHeadingSortable) => {
    if (column !== columnToSort) {
      draftSort[column] = 'none';
    } else {
      draftSort[column] = getNextSortDirection(prevSortDirection);
    }
  });

  return draftSort;
};
