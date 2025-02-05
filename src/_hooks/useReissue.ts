"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const handleReissue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}reissue`,
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
  });
};

export default useReissue;
