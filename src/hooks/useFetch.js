import { useEffect, useState } from "react";
import makeRequesInstance from "../makeRequest";
import { useAlert } from "react-alert";

const useFetch = ({ url, change }) => {
  const [data, setdata] = useState(null);
  const [loding, setLoding] = useState(false);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert=useAlert();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(url);
        setdata(res.data);
      } catch (error) {
        if(error.response){
          alert.show(error.response.data.title,{type:'info'})
        }
        else if(error.code==='ERR_NETWORK'){
          alert.show(error.message,{type:'error'})
        }
        else{
          alert.show('Iternal server error',{type:'error'})
        }
      }
      setLoding(false);
    };
      fetchData();
  }, [url, change]);
  return { loding, data };
};

export default useFetch;
