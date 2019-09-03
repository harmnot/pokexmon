import axios from 'axios';

export default axios.create({
  baseURL: 'http://35.186.145.25:4000/api',
  timeout: 10000,
});
