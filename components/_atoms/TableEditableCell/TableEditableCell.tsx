import { useState } from 'react';
import { ITableDealerRowValue } from '../../../interfaces';
import TableCellInut from './_sub_atoms/TableCellInput';
import useOutsideTableCellClick from '../../../utils/hooks/useOutsideClick';

type IProps = {
  tableData: ITableDealerRowValue;
  tableDataType: 'number' | 'string' | 'lastAndFirstName';
};

const TableEditableCell = ({ tableData, tableDataType }: IProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(tableData);
  const tableCellRef = useOutsideTableCellClick(() => setIsEditable(false));

  return (
    <td onDoubleClick={() => setIsEditable(true)} ref={tableCellRef}>
      {isEditable ? (
        <TableCellInut
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          setValueToEdit={setValueToEdit}
          valueToEdit={valueToEdit}
          tableDataType={tableDataType}
        />
      ) : (
        tableData
      )}
    </td>
  );
};

export default TableEditableCell;
