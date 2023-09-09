import axios from 'axios';
import { IBaseDevPort } from '../interfaces';

const getProtocol = (currentDevPort: IBaseDevPort) => {
  switch (currentDevPort) {
    case '5249':
      return 'http';
    case '7021':
      return 'https';
    default:
      return undefined;
  }
};

export const dealerApiInstance = (currentDevPort: IBaseDevPort) => {
  const protocol = getProtocol(currentDevPort);
  const baseURL = `${protocol}://localhost:${currentDevPort}/api/DealerController/`;
  return axios.create({
    baseURL,
  });
};

const dealerDraftEndpoints = {
  pagination: 'Pagination',
};

export const dealerApiEndpoints = Object.freeze(dealerDraftEndpoints);
