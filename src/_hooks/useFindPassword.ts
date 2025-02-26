"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const fetchFindPassword = async (email: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/me/find-password?email=${email}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const useFindPassword = () => {
  return useMutation({
    mutationFn: (email: string) => fetchFindPassword(email),
  });
};

export default useFindPassword;
