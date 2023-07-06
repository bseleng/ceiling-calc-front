import { ITableSortDirection } from '../../../../../interfaces';
import {
  IconArrowsSort,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react';

interface IProps {
  sortDirection: ITableSortDirection;
}

const SortIconText = ({ sortDirection }: IProps) => {
  switch (sortDirection) {
    case 'none':
      return <IconArrowsSort />;
    case 'desc':
      return <IconSortDescendingLetters />;
    case 'asc':
      return <IconSortAscendingLetters />;
  }
};

export default SortIconText;
