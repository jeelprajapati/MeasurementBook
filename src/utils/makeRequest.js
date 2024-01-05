import axios from 'axios';

const makeRequesInstance = (token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export default makeRequesInstance;
