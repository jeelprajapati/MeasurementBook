import axios from 'axios';

const makeRequesInstance = (token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cache-Control':'no-cache'
    }
  });
};

export default makeRequesInstance;
