import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const token = localStorage.getItem("token");
  const Id = localStorage.getItem("organizationId");
  const navigate = useNavigate();
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  }, [navigate, token, Id]);
};

export default useRedirect;
