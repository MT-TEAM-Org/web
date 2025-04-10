"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const handleReissue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/token/regenerate`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};

const useReissue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleReissue,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", data.headers.authorization);
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
    },
  });
};

export default useReissue;
