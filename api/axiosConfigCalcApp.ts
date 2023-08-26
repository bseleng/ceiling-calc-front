import axios from 'axios';
import { IBaseDevURL } from '../interfaces';

export const dealerApiInstance = (currentDevPort: IBaseDevURL) => {
  const baseURL = `http://localhost:${currentDevPort}/api/DealerController/`;
  return axios.create({
    baseURL,
  });
};

const dealerDraftEndpoints = {
  pagination: 'Pagination',
};

export const dealerApiEndpoints = Object.freeze(dealerDraftEndpoints);
