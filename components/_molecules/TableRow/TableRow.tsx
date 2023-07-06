import { ITableDealerRow } from '../../../interfaces';

interface IProps extends ITableDealerRow {}

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
