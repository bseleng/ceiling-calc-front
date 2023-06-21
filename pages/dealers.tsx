import { useEffect, useState } from 'react';
import { dealerApi } from '../api/axiosConfigCalcApp';
import { TableSort } from '../components/TableWithSearch/Table';
import { log } from 'console';
import TableDealer from '../components/_organisms/TableDealer/TableDealer';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const getDealers = dealerApi.get('/DealerControllerGetAll');

  useEffect(() => {
    getDealers.then((response) => {
      console.log(response.data);
      setDealers(response.data);
    });
  }, []);

  return (
    <div>
      <TableSort data={dealersMock} />
      <br />
      <br />
      <br />
      <div>test</div>
      <TableDealer headingDebt="debt" headingName="name" headingPhone="phone" rows={dealers} />
    </div>
  );
};

export default Dealers;
