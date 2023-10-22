import { useEffect, useState } from 'react';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';
import { useAtom, useAtomValue } from 'jotai';
import {
  ATableDealerActiveSortColumn,
  ATableDealerRows,
  ATableDealerSortDirections,
} from '../store/AtomsTableDealer';
import {
  Button,
  Container,
  Flex,
  Pagination,
  Select,
  Space,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { ABaseDevPort } from '../store/AtomsAPI';
import { IconHome, IconSquareX, IconUserPause } from '@tabler/icons-react';
import Link from 'next/link';
import { dealerApiInstance } from '../api/axiosConfigCalcApp';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import AddDealerModal from '../components/_organisms/TableDealer/AddDealerModal';
import { useForm } from '@mantine/form';
import { ITableDealerRow, ITableUpdateDealerField } from '../interfaces';

const Dealers = () => {
  const currentDevPort = useAtomValue(ABaseDevPort);

  const [dealers, setDealers] = useAtom(ATableDealerRows);

  const [searchStringInput, setSearchStringInput] = useState('');
  const [searchStringQuery, setSearchStringQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState<string | null>('5');
  const [isLoading, setIsLoading] = useState(false);
  const sortDirection = useAtomValue(ATableDealerSortDirections);
  const activeSortColumn = useAtomValue(ATableDealerActiveSortColumn);

  const getDealersParams = {
    pageNumber: activePage.toString(),
    pageSize: (pageSize as string) || '1',
    ...(activeSortColumn && { property: activeSortColumn }),
    ...(activeSortColumn && { sort: sortDirection[activeSortColumn] }),
    ...(searchStringQuery && { searchString: searchStringQuery }),
  };
  const getDealersParamsQuery = new URLSearchParams(getDealersParams);

  const [opened, { open, close }] = useDisclosure(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    telephone: '',
    debts: 0,
    city: '',
  } as Omit<ITableDealerRow, 'id'>;

  const form = useForm({
    validateInputOnBlur: true,
    initialValues,
    validate: {
      telephone: (value) =>
        /^[1-9]\d{10,10}$/.test(String(value)) ? null : 'Только цифры. 11 знаков. ',
      debts: (value) => (/^-?\d{0,15}$/.test(String(value)) ? null : 'Только цифры.'),
      city: (value) => (/^.{2,30}$/.test(value) ? null : 'От 2 до 30 знаков'),
      firstName: (value) => (/^.{2,30}$/.test(value) ? null : 'От 2 до 30 знаков'),
      lastName: (value) => (/^.{2,50}$/.test(value) ? null : 'От 1 до 30 знаков'),
    },
  });

  const updateDealers = () => {
    setIsLoading(true);
    const getDealers = dealerApiInstance(currentDevPort)('?' + getDealersParamsQuery);

    getDealers
      .then((response) => {
        setDealers(response.data.data);
        setTotalPages(response.data.totalPages);

        if (activePage > response.data.totalPages && response.data.totalPages !== 0) {
          setActivePage(response.data.totalPages);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchStringQuery !== searchStringInput) {
        setSearchStringQuery(searchStringInput);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchStringInput]);

  //TODO: refactor curry???
  useEffect(() => {
    if (currentDevPort !== undefined) {
      updateDealers();
    }
  }, [currentDevPort, activePage, pageSize, sortDirection, searchStringQuery]);

  //TODO: when deleting last dealer from last page there is an extra DB call need to remove
  const deleteDealer = async (dealerId: number) => {
    await dealerApiInstance(currentDevPort).delete('/' + dealerId);

    const updatedDealers = dealers.filter((dealer) => dealer.id !== dealerId);
    setDealers([...updatedDealers]);

    if (currentDevPort !== undefined && updatedDealers.length === 0) {
      updateDealers();
    }
  };

  const updateDealer = async (updateFields: ITableUpdateDealerField[]) => {
    const updateFieldsReq = updateFields.map((updateField) => {
      return {
        op: 'add',
        path: updateField.path,
        value: updateField.value,
      };
    });
    const patchDealerRes = await dealerApiInstance(currentDevPort)
      .patch('/PatchJson?id=' + updateFields[0].dealerId, updateFieldsReq, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
      });

    if (patchDealerRes && patchDealerRes.id) {
      const updatedDealers = [...dealers];
      const dealerToUpdateindex = updatedDealers.findIndex(
        (dealer) => dealer.id === patchDealerRes.id
      );
      updatedDealers[dealerToUpdateindex] = patchDealerRes;
      setDealers(updatedDealers);
    }
  };

  return (
    <Container size={'xl'}>
      <Space h="xl" />

      <AddDealerModal close={close} opened={opened} form={form} />
      <Flex>
        <Link href={'/'}>
          <ThemeIcon radius="md" size="xl">
            <IconHome size={26} strokeWidth={2} />
          </ThemeIcon>
        </Link>
      </Flex>
      <Flex justify={'flex-end'} align={'flex-end'}>
        <Button color={form.isDirty() ? 'yellow' : 'green'} onClick={open}>
          {form.isDirty() ? 'Продолжить' : 'Новый дилер'}
          <Space w="xs" />

          {form.isDirty() ? (
            <IconUserPause size={26} strokeWidth={1} />
          ) : (
            <IconUserPlus size={26} strokeWidth={1} />
          )}
        </Button>
        <Space w="md" />
        <Select
          label="Записей на странице"
          placeholder="Записей на странице"
          value={pageSize}
          onChange={setPageSize}
          data={[
            { value: '1', label: '1' },
            { value: '3', label: '3' },
            { value: '5', label: '5' },
            { value: '7', label: '7' },
            { value: '10', label: '10' },
          ]}
        />
      </Flex>
      <Space h="xl" />
      <TextInput
        placeholder="Полноекстовый поиск. Можно искать по частичным совпадениям слов: Алекс Мос. Для поиска введите запрос от 2 символов"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={searchStringInput}
        onChange={(e) => {
          if (searchStringInput !== e.target.value) {
            setSearchStringInput(e.target.value);
          }
        }}
        rightSection={
          searchStringInput && (
            <Button variant="subtle" color="red" onClick={() => setSearchStringInput('')}>
              <IconSquareX />
            </Button>
          )
        }
        rightSectionWidth={63}
      />
      <TableDealer
        rowCount={Number(pageSize as string) || 3}
        isLoading={isLoading}
        deleteDealer={deleteDealer}
        updateDealer={updateDealer}
      />
      <Space h="xl" />
      <Pagination value={activePage} onChange={setActivePage} total={totalPages} />
    </Container>
  );
};

export default Dealers;
