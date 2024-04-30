import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const addRFMeasurementBook = async (values, index, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.post("MeasurementBook", {
      rfMeasurementBookDto: {
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

export const deleteRFMeasurementBook = async (id, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.delete(`RFMeasurementBook/${id}`);
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

export const getRFShapes = async () => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.get(`Standard/GetRfShape`);
    if (res.status === 200) {
      return res.data;
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
