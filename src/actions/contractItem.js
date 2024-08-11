import toast from "react-hot-toast";
import makeRequesInstance from "../utils/makeRequest";

export const getContractItem = async (projectId, page, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.get(
      `/ContractItem/GetByProjectId?projectId=${projectId}&page=1&pageSize=${
        page * 9
      }`
    );
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

export const addContractItem = async (values, index, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.post("ContractItem", {
      contractItemDto: {
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

export const updateContractItem = async (values, projectId, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.put("ContractItem", {
      ...values,
      projectId,
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

export const deleteContractItem = async (id, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.delete(`/ContractItem?contractItemId=${id}`);
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

export const addContractItemRange = async (newarray, projectId, callback) => {
  try {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const res = await makeRequest.post("/ContractItem/AddContractItemRange", {
      contractItems: [...newarray],
      projectID: `${projectId}`,
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
