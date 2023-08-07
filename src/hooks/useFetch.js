import { useEffect, useState } from "react";
import makeRequesInstance from "../makeRequest";

const useFetch = ({ url, change }) => {
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null);
  const [loding, setLoding] = useState(false);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(url);
        setdata(res.data);
      } catch (error) {
        setError(error);
      }
      setLoding(false);
    };
    return () => {
      fetchData();
    };
  }, [url, change]);
  return { loding, error, data };
};

export default useFetch;
