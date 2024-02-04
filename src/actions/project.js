import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const getProjects = async (Id, page, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(
      `/Project?page=1&pageSize=${page * 7}&organizationId=${Id}`
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

export const getProject = async (id, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(`/Project/${id}`);
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

export const addProject = async (values, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.post("Project", values);
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

export const updateProject = async (values, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.put("Project", values);
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

export const getTagsByProject = async (projectId, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(
      `Project/GetTagsByProjectId?projectId=${projectId}`
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

export const getExcelReport = async (billId, callback) => {
  try {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'));
    const res = await makeRequest.get(
      `Project/GenerateStandardExcelReport?billId=${billId}`,
      { responseType: "blob" }
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
