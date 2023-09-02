import { useEffect } from 'react';
import { dealerApiEndpoints, dealerApiInstance } from '../api/axiosConfigCalcApp';
import { TableSort } from '../components/TableWithSearch/Table';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';
import { useAtom, useAtomValue } from 'jotai';
import { ATableDealerRows } from '../store/AtomsTableDealer';
import { Container } from '@mantine/core';
import { ABaseDevURL } from '../store/AtomsAPI';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const currentDevPort = useAtomValue(ABaseDevURL);

  const [dealers, setDealers] = useAtom(ATableDealerRows);
  const dealersParams = {
    PageNumber: '1',
    PageSize: '3',
  };
  const dealersParamsQuery = new URLSearchParams(dealersParams);

  //TODO: refactor curry???
  useEffect(() => {
    if (currentDevPort !== undefined) {
      const getDealers = dealerApiInstance(currentDevPort)(
        dealerApiEndpoints.pagination + '?' + dealersParamsQuery
      );

      getDealers.then((response) => {
        setDealers(response.data.data);
      });
    }
  }, [currentDevPort]);

  return (
    <Container size={'xl'}>
      <TableSort data={dealersMock} />
      <br />
      <br />
      <br />
      <TableDealer />
    </Container>
  );
};

export default Dealers;
