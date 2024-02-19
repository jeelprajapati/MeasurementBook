import { useState } from "react";

const useInfinityScroll = () => {
  const [page, setPage] = useState(1);
  
  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= clientHeight + scrollTop + 1) {
      setPage((prev) => prev + 1);
    }
  };
  return { handleInfinityScroll, page };
};

export default useInfinityScroll;
