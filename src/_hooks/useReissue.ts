"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const handleReissue = async () => {
  const response = await axios.post(
    "http://api.playhive.shop:8080/reissue",
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};

const useReissue = () => {
  return useMutation({
    mutationFn: handleReissue,
    onSuccess: (data) => {
      if (data.status === 200) {
        localStorage.setItem("accessToken", data.headers.authorization);
      }
    },
  });
};

export default useReissue;
