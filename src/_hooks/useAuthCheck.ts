import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchAuthCheck = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
};

const useAuthCheck = () => {
  return useMutation({
    mutationFn: fetchAuthCheck,
  });
};

export default useAuthCheck;
