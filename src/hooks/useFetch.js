import { useEffect, useState } from "react";
import makeRequesInstance from "../utils/makeRequest";
import { useAlert } from "react-alert";

const useFetch = ({ url, change }) => {
  const [data, setdata] = useState(null);
  const [loding, setLoding] = useState(false);
  const alert=useAlert();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get(url);
        setdata(res.data);
      } catch (error) {
        if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
        } else {
          alert.show("something went wrong", { type: "info" });
        }
      }
      setLoding(false);
    };
      fetchData();
  }, [url, change,alert]);
  return { loding, data };
};

export default useFetch;
