import { useEffect, useState } from 'react';
import {
  ITableDealerHeadingEditable,
  ITableDealerRowValue,
  ITableUpdateDealerField,
} from '../../../interfaces';
import TableCellInut from './_sub_atoms/TableCellInput';
import useOutsideTableCellClick from '../../../utils/hooks/useOutsideClick';
import { useIsFirstRender } from '../../../utils/hooks/useIsFirstRender';

type IProps = {
  tableData: ITableDealerRowValue;
  tableDataType: 'number' | 'string' | 'lastAndFirstName';
  tableField: ITableDealerHeadingEditable;
  id: number;
  updateDealer(updateFields: ITableUpdateDealerField[]): void;
};

const TableEditableCell = ({ tableData, tableDataType, id, tableField, updateDealer }: IProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(tableData);
  const tableCellRef = useOutsideTableCellClick(() => setIsEditable(false));
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isEditable && !isFirstRender) {
      updateDealer([
        {
          dealerId: id,
          path: tableField,
          value: valueToEdit,
        },
      ]);
    }
  }, [isEditable]);

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
