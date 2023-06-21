import { Table, ThemeIcon } from '@mantine/core';
import { ITableDealer } from '../../../interfaces';
import TableRow from '../../_molecules/TableRow/TableRow';

interface IProps extends ITableDealer {}

const TableDealer = ({ rows, headingDebt, headingName, headingPhone }: IProps) => {
  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <TableRow
            debts={row.debts}
            firstName={row.firstName}
            lastName={row.lastName}
            telephone={row.telephone}
            key={row.firstName + row.lastName + row.telephone}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TableDealer