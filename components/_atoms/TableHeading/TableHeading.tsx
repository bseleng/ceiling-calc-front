import { createStyles, UnstyledButton, Group, Text, Center, rem } from '@mantine/core';
import { ITableSortDirection, ITableSortIcon } from '../../../interfaces';
import SortIconPicker from './_sub_atoms/SortIconPicker/SortIconPicker';

interface IProps {
  children: React.ReactNode;
  onSort?: () => void;
  iconType?: ITableSortIcon;
  sortDirection?: ITableSortDirection;
}

const TableHeading = ({ children, onSort, iconType, sortDirection }: IProps) => {
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

    icon: {
      width: rem(21),
      height: rem(21),
      borderRadius: rem(21),
    },
  }));

  const { classes } = useStyles();

  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
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
