import { useEffect, useState } from "react";
import makeRequesInstance from "../utils/makeRequest";
import toast from "react-hot-toast";

const useFetch = ({ url, change }) => {
  const [data, setdata] = useState(null);
  const [loding, setLoding] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get(url);
        setdata(res.data);
      } catch (error) {
        if (error.response) {
            toast.error(error.response.data.title);
        } else {
          toast.error("something went wrong");
        }
      }
      setLoding(false);
    };
      fetchData();
  }, [url, change]);
  return { loding, data };
};

export default useFetch;
