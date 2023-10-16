import { NumberInput } from '@mantine/core';
import { ITableDealerRowValue } from '../../../../interfaces';
import useOutsideTableCellClick from '../../../../utils/hooks/useOutsideClick';

type IProps = {
  tableDataType: 'number' | 'string' | 'lastAndFirstName';
  valueToEdit: ITableDealerRowValue;
  setValueToEdit(arg: ITableDealerRowValue): void;
  isEditable: boolean;
  setIsEditable(arg: boolean): void;
};

const TableCellInut = ({
  tableDataType,
  valueToEdit,
  setValueToEdit,
  isEditable,
  setIsEditable,
}: IProps) => {
  switch (tableDataType) {
    case 'number':
      return (
        <NumberInput
          value={valueToEdit as number}
          onChange={setValueToEdit}
          hideControls
        />
      );
  }
};

export default TableCellInut;
