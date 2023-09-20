import { Box, Button, Flex, Modal, Space, TextInput } from '@mantine/core';
import { IconEraser } from '@tabler/icons';
import { useAtomValue } from 'jotai';
import { ABaseDevPort } from '../../../store/AtomsAPI';
import { UseFormReturnType } from '@mantine/form';
import { ITableDealerRow } from '../../../interfaces';
import { useState } from 'react';
import { dealerApiInstance } from '../../../api/axiosConfigCalcApp';

type IProps = {
  opened: boolean;
  close(): void;
  form: UseFormReturnType<Omit<ITableDealerRow, 'id'>>;
};

const AddDealerModal = ({ close, opened, form }: IProps) => {
  const currentDevPort = useAtomValue(ABaseDevPort);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Modal opened={opened} onClose={close} title="Новый дилер" centered>
      <Box maw={300} mx="auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const validated = form.validate();

            if (!validated.hasErrors) {
              setIsAdding(true);
              const addNewDealer = dealerApiInstance(currentDevPort).post('/', form.values);
              addNewDealer
                .then((response) => {
                  console.log(response);
                  if (response.statusText === 'OK') {
                    form.reset();
                    close();
                  }
                })
                .finally(() => {
                  setIsAdding(false);
                });
            }

            console.log(form.validate());
          }}
        >
          <TextInput
            withAsterisk
            label="Имя"
            placeholder="Александр"
            {...form.getInputProps('firstName')}
          />
          <Space h="md" />
          <TextInput
            withAsterisk
            label="Фамилия"
            placeholder="Пушкин"
            {...form.getInputProps('lastName')}
          />
          <Space h="md" />
          <TextInput
            withAsterisk
            label="Телефон"
            placeholder="79991112233"
            {...form.getInputProps('telephone')}
          />
          <Space h="md" />
          <TextInput label="Задолженность" placeholder="0" {...form.getInputProps('debts')} />
          <Space h="md" />
          <TextInput
            withAsterisk
            label="Город"
            placeholder="Москва"
            {...form.getInputProps('city')}
          />
          <Space h="xl" />

          <Flex justify={'space-between'}>
            <Button type="button" color="red" onClick={() => form.reset()}>
              {'Очистить'}
              <Space w="sm" />
              <IconEraser size={26} strokeWidth={2} />
            </Button>
            <Space w="xl" />
            <Button
              type="submit"
              loading={isAdding}
              color={isAdding ? 'yellow' : 'blue'}
            >
              {isAdding ? 'Добавляем' : 'Добавить'}
            </Button>
          </Flex>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDealerModal;
