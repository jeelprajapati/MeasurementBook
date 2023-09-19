import axios from 'axios';

const makeRequesInstance = (token) => {
  return axios.create({
    baseURL: 'https://dev-api.measurekaro.com/api',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export default makeRequesInstance;
