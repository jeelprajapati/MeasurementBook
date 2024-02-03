import { useEffect, useState } from "react";

const useInfinityScroll = ({credential}) => {
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if(!credential){
      setChange(true);
    }
    else{
      setChange(false);
    }
  }, [height,credential]);
  
  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    setHeight(scrollHeight);
    if (scrollHeight <= clientHeight + scrollTop + 1 && change) {
      setPage((prev) => prev + 1);
      setChange(false);
    }
  };
  return { handleInfinityScroll, page };
};

export default useInfinityScroll;
