import { createStyles, UnstyledButton, Group, Text, Center, rem } from '@mantine/core';
import { ITableSortDirection, ITableSortIcon } from '../../../interfaces';
import SortIconPicker from './_sub_atoms/SortIconPicker/SortIconPicker';

interface IProps {
  children: React.ReactNode;
  onSort?: () => void;
  iconType?: ITableSortIcon;
  sortDirection?: ITableSortDirection;
  isActive?: boolean;
}

const TableHeading = ({ children, onSort, iconType, sortDirection, isActive }: IProps) => {
  const useStyles = createStyles((theme) => ({
    th: {
      padding: '0 !important',
    },

    control: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },

    active: {
      backgroundColor: isActive ? theme.colors.blue : '',
      borderRadius: isActive ? '5px' : '',

      '&:hover': {
        backgroundColor: theme.colors.blue[8],
      },
    },

    icon: {
      width: rem(21),
      height: rem(21),
      borderRadius: rem(21),
    },
  }));

  const { classes } = useStyles();

  return (
    <th className={classes.th}>
      <UnstyledButton
        onClick={onSort}
        className={`${classes.control} ${isActive ? classes.active : ''}`}
        aria-modal
      >
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          {onSort && iconType && sortDirection && (
            <Center className={classes.icon}>
              <SortIconPicker iconType={iconType} sortDirection={sortDirection} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
};

export default TableHeading;
