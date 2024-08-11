import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const getOrganization = async (token, callback) => {
    const newRequest = makeRequesInstance(token);
    try {
      const res = await newRequest.get("Account/GetUserInfo");
      if (res.status === 200) {
        callback(res.data);
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

  export const updateUserInfo = async (values, callback) => {
    try {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.put("Account/UpdateUserInfo", values);
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