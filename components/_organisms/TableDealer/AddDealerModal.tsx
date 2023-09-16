import { Box, Button, Flex, Modal, Space, TextInput } from '@mantine/core';
import { dealerApiInstance } from '../../../api/axiosConfigCalcApp';
import { IconEraser } from '@tabler/icons';
import { useAtomValue } from 'jotai';
import { ABaseDevPort } from '../../../store/AtomsAPI';
import { UseFormReturnType } from '@mantine/form';
import { ITableDealerRow } from '../../../interfaces';

type IProps = {
  opened: boolean;
  close(): void;
  form: UseFormReturnType<Omit<ITableDealerRow, 'id'>>;
};

const AddDealerModal = ({ close, opened, form }: IProps) => {
  const currentDevPort = useAtomValue(ABaseDevPort);

  return (
    <Modal opened={opened} onClose={close} title="Новый дилер" centered>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Имя"
            placeholder="Александр"
            {...form.getInputProps('firstName')}
          />
          <Space h="md" />
          <TextInput
            required
            label="Фамилия"
            placeholder="Пушкин"
            {...form.getInputProps('lastName')}
          />
          <Space h="md" />
          <TextInput
            required
            label="Телефон"
            placeholder="79991112233"
            {...form.getInputProps('telephone')}
          />
          <Space h="md" />
          <TextInput label="Задолженность" placeholder="0" {...form.getInputProps('debts')} />
          <Space h="md" />
          <TextInput required label="Город" placeholder="Москва" {...form.getInputProps('city')} />
          <Space h="xl" />

          <Flex justify={'flex-end'}>
            <Button type="button" color="red" onClick={() => form.reset()}>
              {'Очистить'}
              <IconEraser size={26} strokeWidth={2} />
            </Button>
            <Space w="xl" />
            <Button
              type="submit"
              onClick={() => {
                const addNewDealer = dealerApiInstance(currentDevPort).post('/', form.values);
                addNewDealer.then((response) => {
                  console.log(response);
                });
              }}
            >
              {'Добавить'}
            </Button>
          </Flex>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDealerModal;
