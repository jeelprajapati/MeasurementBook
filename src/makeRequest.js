import axios from 'axios';

const makeRequesInstance = (token) => {
  return axios.create({
    baseURL: 'http://billbookapi-env-1.eba-ue94tp4s.ap-south-1.elasticbeanstalk.com/api',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export default makeRequesInstance;
