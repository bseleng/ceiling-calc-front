import { ITableDealerRow } from '../../../interfaces';
import TableDataActions from '../../_atoms/TableDataActions/TableDataActions';

interface IProps extends ITableDealerRow {
  deleteDealer(dealerId: number): void;
}

const TableRow = ({ debts, firstName, lastName, telephone, id, deleteDealer, city }: IProps) => {
  return (
    <tr>
      <td>{lastName + ' ' + firstName}</td>
      <td>{telephone}</td>
      <td>{debts}</td>
      <td>{city}</td>
      <td>
        <TableDataActions id={id} deleteDealer={deleteDealer} />
      </td>
    </tr>
  );
};

export default TableRow;
