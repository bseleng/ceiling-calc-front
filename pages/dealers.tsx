import { useEffect, useState } from 'react';
import { dealerApiEndpoints, dealerApiInstance } from '../api/axiosConfigCalcApp';
import { TableSort } from '../components/TableWithSearch/Table';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';
import { useAtom, useAtomValue } from 'jotai';
import { ATableDealerRows } from '../store/AtomsTableDealer';
import { Container, Pagination, Space } from '@mantine/core';
import { ABaseDevURL } from '../store/AtomsAPI';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const currentDevPort = useAtomValue(ABaseDevURL);

  const [dealers, setDealers] = useAtom(ATableDealerRows);

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const dealersParams = {
    PageNumber: activePage.toString(),
    PageSize: pageSize.toString(),
  };
  const dealersParamsQuery = new URLSearchParams(dealersParams);

  //TODO: refactor curry???
  useEffect(() => {
    if (currentDevPort !== undefined) {
      setIsLoading(true);
      const getDealers = dealerApiInstance(currentDevPort)(
        dealerApiEndpoints.pagination + '?' + dealersParamsQuery
      );

      getDealers
        .then((response) => {
          setDealers(response.data.data);
          setTotalPages(response.data.totalPages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentDevPort, activePage]);

  return (
    <Container size={'xl'}>
      <TableSort data={dealersMock} />
      <br />
      <br />
      <br />
      <TableDealer rowCount={pageSize} isLoading={isLoading} />
      <Space h="xl" />
      <Pagination value={activePage} onChange={setPage} total={totalPages} />
    </Container>
  );
};

export default Dealers;
