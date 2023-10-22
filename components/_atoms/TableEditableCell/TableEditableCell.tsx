import { useEffect, useState } from 'react';
import {
  ITableDealerHeadingEditable,
  ITableDealerRowValue,
  ITableUpdateDealerField,
} from '../../../interfaces';
import TableCellInut from './_sub_atoms/TableCellInput';
import useOutsideTableCellClick from '../../../utils/hooks/useOutsideClick';
import { useIsFirstRender } from '../../../utils/hooks/useIsFirstRender';
import { createStyles } from '@mantine/core';
import doubleClickIconBlack from '../../../assets/icons/mouse-double-click-icon-black.webp';
import doubleClickIconWhite from '../../../assets/icons/mouse-double-click-icon-white.webp';

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

  const useStyles = createStyles((theme) => ({
    editable: {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        backgroundImage: `url(${
          theme.colorScheme === 'dark' ? doubleClickIconWhite.src : doubleClickIconBlack.src
        })`,
        backgroundSize: '40px',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '90%',
        backgroundPositionY: '50%',
      },
    },
  }));

  const { classes } = useStyles();

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
    <td
      onDoubleClick={() => setIsEditable(true)}
      ref={tableCellRef}
      className={isEditable ? '' : classes.editable}
    >
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
