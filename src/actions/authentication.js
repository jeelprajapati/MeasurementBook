import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";
const makeRequest=makeRequesInstance(localStorage.getItem('token'));

export const register = async (values, callback) => {
  try {
    const res = await makeRequest.post(
      "/Authentication/register/subscriber",
      values
    );
    if (res.status === 200) {
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

export const login = async (values, callback) => {
  try {
    const res = await makeRequest.post("Authentication/login", values);
    if (res.status === 200) {
      callback(res.data.token);
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Invalid Email Or Password");
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};

export const getOrganizationId = async (token, callback) => {
  const newRequest = makeRequesInstance(token);
  try {
    const res = await newRequest.get("Account/GetUserInfo");
    if (res.status === 200) {
      callback(res.data.organizations[0].organizationID);
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

export const forgetPassword = async (values, callback) => {
  try {
    const res = await makeRequest.post(
      "Authentication/forgot-password",
      values
    );
    if (res.status === 200) {
      callback();
    }
  } catch (error) {
    if (error.status === 404) {
      toast.error("Invalid email address");
    } else {
      toast.error("Something Went Wrong!");
    }
  }
};

export const resetPassword = async (Email, Token, Password, callback) => {
  try {
    const res = await makeRequest.post(
      "Authentication/reset-password",
      {},
      {
        params: {
          Email,
          Token,
          Password,
        },
      }
    );
    if (res.status === 200) {
        callback();
    }
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
};
