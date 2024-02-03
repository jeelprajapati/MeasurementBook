import toast from "react-hot-toast";
import { makeRequest } from "../constants/makeRequest";

export const addStructMeasurementBook = async (values, index, callback) => {
    try {
      const res = await makeRequest.post("StructMeasurementBook", {
        structMeasurementBookDto: {
          ...values,
        },
        index,
      });
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

  export const updateStructMeasurementBook = async (values, billId, callback) => {
    try {
      const res = await makeRequest.put("StructMeasurementBook", {
        ...values,
        billId
      });
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

  export const deleteStructMeasurementBook = async (id,callback) => {
    try {
      const res = await makeRequest.delete(`StructMeasurementBook/${id}`);
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