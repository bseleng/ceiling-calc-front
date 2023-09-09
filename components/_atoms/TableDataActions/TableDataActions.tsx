import { Button, Flex, Space, Text } from '@mantine/core';
import { IconArrowBackUp, IconTrash } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';

type IProps = {
  id: number;
  deleteDealer(dealerId: number): void;
};

const TableDataActions = ({ id, deleteDealer }: IProps) => {
  const countDownInitialValue = 5;
  const deleteTextInitialValue = 'Отменить удаление';

  const countDownId = useRef<unknown | number | null>(null);

  const [isDelete, setIsDelete] = useState(false);
  const [countDownValue, setCountDownValue] = useState(countDownInitialValue);
  const [deleteText, setDeletetext] = useState(deleteTextInitialValue);
  const isDeleting = countDownValue < 1;

  const reduceCountDownValue = () => {
    if (countDownValue > 0) {
      setCountDownValue(countDownValue - 1);
    }
  };

  useEffect(() => {
    if (isDelete) {
      countDownId.current = setTimeout(reduceCountDownValue, 1000);
    }

    if (!isDelete) {
      setCountDownValue(countDownInitialValue);
      setDeletetext(deleteTextInitialValue);
    }

    return () => clearTimeout(countDownId.current as number);
  }, [isDelete, countDownValue]);

  useEffect(() => {
    if (isDeleting) {
      setDeletetext('Идёт удаление');
    }
  }, [countDownValue]);

  useEffect(() => {
    if (isDeleting) {
      deleteDealer(id);
    }
  }, [isDeleting]);

  return (
    <Flex>
      {isDelete ? (
        <Button
          color={isDeleting ? 'yellow' : 'green'}
          onClick={() => setIsDelete(false)}
          loading={isDeleting}
        >
          {!isDeleting && <IconArrowBackUp size={26} strokeWidth={1} />}
          <Space w="sm" />
          <Text> {deleteText}</Text>
          <Space w="sm" />
          {!isDeleting && <Text>{countDownValue}</Text>}
        </Button>
      ) : (
        <Button
          color="red"
          onClick={() => {
            console.log('going to delete ', id);
            setIsDelete(true);
          }}
        >
          <IconTrash size={26} strokeWidth={1} />
        </Button>
      )}
    </Flex>
  );
};

export default TableDataActions;
