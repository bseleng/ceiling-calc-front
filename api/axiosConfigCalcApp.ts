import axios from 'axios';

export const dealerApiInstance = axios.create({
  baseURL: 'http://localhost:5249/api/DealerController/',
  method: 'GET',
});

const dealerDraftEndpoints = {
  pagination: 'Pagination',
};

export const dealerApiEndpoints = Object.freeze(dealerDraftEndpoints);
