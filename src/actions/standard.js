import { makeRequest } from "../constants/makeRequest";

export const getCountry = async (callback) => {
  const res = await makeRequest.get("Standard/GetCountries");
  if (res.status === 200) {
    callback(res.data);
  }
};

export const getState = async (callback) => {
  const res = await makeRequest.get("Standard/GetStates");
  if (res.status === 200) {
    callback(res.data);
  }
};

export const getUnit = async (callback) => {
  const res = await makeRequest.get("Standard/GetStandardUnit");
  if (res.status === 200) {
    callback(res.data);
  }
};

export const getShape = async (callback) => {
  const res = await makeRequest.get("Standard/GetStructShape");
  if (res.status === 200) {
    callback(res.data);
  }
};

export const getPlan = async (callback) => {
    const res = await makeRequest.get("Standard/GetPlans");
    if(res.status===200){
        callback(res.data);
    }
};
