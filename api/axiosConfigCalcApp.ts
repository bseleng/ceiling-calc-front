import axios from 'axios';

export const dealerApi = axios.create({
  baseURL: 'http://localhost:5249/api/DealerController/',
  method: "GET"
});
