import { ITableDealerRow } from '../../../interfaces';
import TableDataActions from '../../_atoms/TableDataActions/TableDataActions';

interface IProps extends ITableDealerRow {}

const TableRow = ({ debts, firstName, lastName, telephone, id }: IProps) => {
  return (
    <tr>
      <td>{lastName + ' ' + firstName}</td>
      <td>{telephone}</td>
      <td>{debts}</td>
      <td>
        <TableDataActions id={id} />
      </td>
    </tr>
  );
};

export default TableRow;
