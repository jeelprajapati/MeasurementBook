import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const addMeasurementBook = async (values, index, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.post("MeasurementBook", {
      measurementBookDto: {
        ...values,
      },
      index,
    });
    if (res.status === 204) {
      callback();
    }
  } catch (error) {
    if (error?.response?.status === 401) {
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

export const updateMeasurementBook = async (values, billId, callback) => {
    try {
      const makeRequest=makeRequesInstance(localStorage.getItem('token'));
      const res = await makeRequest.put("MeasurementBook", {
        ...values,
        billId
      });
      if (res.status === 204) {
        callback();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
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

  export const deleteMeasurementBook = async (id,callback) => {
    try {
      const makeRequest=makeRequesInstance(localStorage.getItem('token'));
      const res = await makeRequest.delete(`MeasurementBook?measurementBookId=${id}`);
      if (res.status === 204) {
        callback();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
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
