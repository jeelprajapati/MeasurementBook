import { useEffect, useState } from "react";
import makeRequesInstance from "../utils/makeRequest";
import toast from "react-hot-toast";

const useFetchByPost = ({
  url,
  billId,
  change,
  contractItemFilter,
  tagFilter,
  page,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore]=useState(true);
  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getData = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.post(url, {
          billId,
          page: 1,
          pageSize: page * 10,
          filter: [
            ...(contractItemFilter.length !== 0
              ? [
                  {
                    filterColumn: 1,
                    filterValue: contractItemFilter[0],
                  },
                ]
              : []),
            ...(tagFilter.length !== 0
              ? [
                  {
                    filterColumn: 2,
                    filterValue: tagFilter.join(","),
                  },
                ]
              : []),
          ],
        });
        if (res.status === 200) {
          setData(res.data?.items);

          console.log(res.data?.items?.length , res.data?.totalCount)
          if(res.data?.items?.length < res.data?.totalCount){
            setHasMore(true);
          }else{
            setHasMore(false);
          }
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
      setLoading(false);
    };

    getData();
  }, [billId, change, contractItemFilter, tagFilter, page, url]);
  return { data, loading, hasMore };
};

export default useFetchByPost;
