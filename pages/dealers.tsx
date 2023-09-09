import { useEffect, useState } from 'react';
import { TableSort } from '../components/TableWithSearch/Table';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';
import { useAtom, useAtomValue } from 'jotai';
import { ATableDealerRows } from '../store/AtomsTableDealer';
import { Container, Flex, Pagination, Select, Space, ThemeIcon } from '@mantine/core';
import { ABaseDevPort } from '../store/AtomsAPI';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { dealerApiInstance } from '../api/axiosConfigCalcApp';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const currentDevPort = useAtomValue(ABaseDevPort);

  const [dealers, setDealers] = useAtom(ATableDealerRows);

  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState<string | null>('3');
  const [isLoading, setIsLoading] = useState(false);

  const getDealersParams = {
    PageNumber: activePage.toString(),
    PageSize: (pageSize as string) || '1',
  };
  const getDealersParamsQuery = new URLSearchParams(getDealersParams);

  //TODO: refactor curry???
  useEffect(() => {
    if (currentDevPort !== undefined || (currentDevPort !== undefined && dealers.length === 0)) {
      setIsLoading(true);
      const getDealers = dealerApiInstance(currentDevPort)('?' + getDealersParamsQuery);

      getDealers
        .then((response) => {
          setDealers(response.data.data);
          setTotalPages(response.data.totalPages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentDevPort, activePage, pageSize, dealers.length]);

  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [totalPages]);

  const deleteDealer = async (dealerId: number) => {
    const deleteDealerParams = {
      id: dealerId.toString(),
    };
    const deleteDealersParamsQuery = new URLSearchParams(deleteDealerParams);

    await dealerApiInstance(currentDevPort).delete('?' + deleteDealersParamsQuery);

    const updatedDealers = dealers.filter((dealer) => dealer.id !== dealerId);
    setDealers([...updatedDealers]);
  };

  return (
    <Container size={'xl'}>
      <TableSort data={dealersMock} />
      <br />
      <br />
      <br />
      <Flex>
        <Link href={'/'}>
          <ThemeIcon radius="md" size="xl">
            <IconHome size={26} strokeWidth={2} />
          </ThemeIcon>
        </Link>
      </Flex>
      <Flex justify={'flex-end'}>
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
      <TableDealer
        rowCount={Number(pageSize as string) || 3}
        isLoading={isLoading}
        deleteDealer={deleteDealer}
      />
      <Space h="xl" />
      <Pagination value={activePage} onChange={setActivePage} total={totalPages} />
    </Container>
  );
};

export default Dealers;
