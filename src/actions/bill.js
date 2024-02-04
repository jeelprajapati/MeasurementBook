import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const getBills = async (page, projectId,callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(
      `/Bill/GetByProjectId?page=${1}&pageSize=${
        page * 7
      }&projectId=${projectId}`
    );
    if(res.status===200){
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

export const addBill = async (values,callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.post('Bill',values);
    if(res.status===204){
     callback() 
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

export const updateBill = async (values,callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.put('Bill',values);
    if(res.status===204){
     callback() 
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
