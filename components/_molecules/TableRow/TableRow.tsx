import { ITableDealerRow, ITableUpdateDealerField } from '../../../interfaces';
import TableDataActions from '../../_atoms/TableDataActions/TableDataActions';
import TableEditableCell from '../../_atoms/TableEditableCell/TableEditableCell';

interface IProps extends ITableDealerRow {
  deleteDealer(dealerId: number): void;
  updateDealer(updateFields: ITableUpdateDealerField[]): void;
}

const TableRow = ({
  debts,
  firstName,
  lastName,
  telephone,
  id,
  deleteDealer,
  city,
  updateDealer,
}: IProps) => {
  return (
    <tr>
      <td>{lastName + ' ' + firstName}</td>
      <TableEditableCell
        id={id}
        tableData={telephone}
        tableField={"telephone"}
        tableDataType="number"
        updateDealer={updateDealer}
      />
      <TableEditableCell
        id={id}
        tableData={debts}
        tableField={"debts"}
        tableDataType="number"
        updateDealer={updateDealer}
      />
      <td>{city}</td>
      <td>
        <TableDataActions id={id} deleteDealer={deleteDealer} />
      </td>
    </tr>
  );
};

export default TableRow;
