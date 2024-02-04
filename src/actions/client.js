import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const getClient = async (Id, page, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(
      `Client?page=${1}&pageSize=${11 * page}&organizationId=${Id}`
    );
    if (res.status === 200) {
      callback(res.data);
    }
  } catch (error) {
    if (error.status === 401) {
      toast(
        "Your session has expired. Please log in again to continue accessing the application.",
        {
          duration: 6000,
        }
      );
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};

export const addClient = async (values, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.post("Client", values);
    if (res.status === 204) {
      callback();
    }
  } catch (error) {
    if (error.status === 401) {
      toast(
        "Your session has expired. Please log in again to continue accessing the application.",
        {
          duration: 6000,
        }
      );
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};

export const updateClient = async (values, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.put("Client", values);
    if (res.status === 204) {
      callback();
    }
  } catch (error) {
    if (error.status === 401) {
      toast(
        "Your session has expired. Please log in again to continue accessing the application.",
        {
          duration: 6000,
        }
      );
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};

export const deleteClient = async (id, organizationId, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.delete(
      `/Client/${id}?organizationId=${organizationId}`
    );
    if (res.status === 200) {
      callback();
    }
  } catch (error) {
    if (error.status === 401) {
      toast(
        "Your session has expired. Please log in again to continue accessing the application.",
        {
          duration: 6000,
        }
      );
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};
