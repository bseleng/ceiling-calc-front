import { ITableRowDealer } from '../../../interfaces';

interface IProps extends ITableRowDealer {}

const TableRow = ({ debts, firstName, lastName, telephone }: IProps) => {
  return (
    <tr>
      <td>{lastName + ' ' + firstName}</td>
      <td>{telephone}</td>
      <td>{debts}</td>
    </tr>
  );
};

export default TableRow;
