import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface SignData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
}

const fetchSign = async (SignData: SignData, url: string) => {
  const response = await axios.post(`${API_BASE_URL}${url}`, SignData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const usePostToken = (url: string) => {
  return useMutation({
    mutationFn: (SignData: SignData) => fetchSign(SignData, url),
  });
};

export default usePostToken;
