import { useEffect } from 'react';
import { dealerApi } from '../api/axiosConfigCalcApp';
import { TableSort } from '../components/TableWithSearch/Table';
import { log } from 'console';

const dealersMock = [
  { name: 'bogdan', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
  { name: 'yuri', company: 'cranky-crag', email: 'bsenelg@gmail.com' },
];
const Dealers = () => {
  const dealers = dealerApi.get('/DealerControllerGetAll');

  useEffect(() => {
    dealers.then((response) => {
      console.log(response);
    });
  }, []);
  return <TableSort data={dealersMock} />;
};

export default Dealers;
