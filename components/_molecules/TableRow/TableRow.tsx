import { ITableDealerRow } from '../../../interfaces';
import TableDataActions from '../../_atoms/TableDataActions/TableDataActions';
import TableEditableCell from '../../_atoms/TableEditableCell/TableEditableCell';

interface IProps extends ITableDealerRow {
  deleteDealer(dealerId: number): void;
}

const TableRow = ({ debts, firstName, lastName, telephone, id, deleteDealer, city }: IProps) => {
  return (
    <tr>
      <td>{lastName + ' ' + firstName}</td>
      <TableEditableCell tableData={telephone} tableDataType="number" />
      <TableEditableCell tableData={debts} tableDataType="number" />
      <td>{city}</td>
      <td>
        <TableDataActions id={id} deleteDealer={deleteDealer} />
      </td>
    </tr>
  );
};

export default TableRow;
