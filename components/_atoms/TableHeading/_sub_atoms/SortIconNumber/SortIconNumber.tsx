import { ITableSortDirection } from '../../../../../interfaces';
import {
  IconArrowsSort,
  IconSortAscendingNumbers,
  IconSortDescendingNumbers,
} from '@tabler/icons-react';

interface IProps {
  sortDirection: ITableSortDirection;
}

const SortIconNumber = ({ sortDirection }: IProps) => {
  switch (sortDirection) {
    case 'none':
      return <IconArrowsSort />;
    case 'desc':
      return <IconSortDescendingNumbers />;
    case 'asc':
      return <IconSortAscendingNumbers />;
  }
};

export default SortIconNumber;
