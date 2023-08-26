import { useEffect } from 'react';
import { dealerApi } from '../api/axiosConfigCalcApp';
import { TableSort } from '../components/TableWithSearch/Table';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';
import { useAtom } from 'jotai';
import { ATableDealerRows } from '../store/AtomsTableDealer';
import { Container } from '@mantine/core';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const [dealers, setDealers] = useAtom(ATableDealerRows);
  const getDealers = dealerApi({});

  useEffect(() => {
    getDealers.then((response) => {
      console.log(response.data);
      setDealers(response.data);
    });
  }, []);

  return (
    <Container size={'xl'}>
      <TableSort data={dealersMock} />
      <br />
      <br />
      <br />
      <div>test</div>
      <TableDealer />
    </Container>
  );
};

export default Dealers;
