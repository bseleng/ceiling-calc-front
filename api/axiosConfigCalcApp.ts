import axios from 'axios';
import { IBaseDevPort, IProtocol } from '../interfaces';

const getProtocol = (currentDevPort: IBaseDevPort): IProtocol => {
  if (currentDevPort === '5249') {
    return 'http';
  }
  return 'https';
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
