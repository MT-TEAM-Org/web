"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface EditUserData {
  email: string;
  tel: string;
  nickname: string;
}

const fetchEditUserData = async (data: EditUserData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/me/update`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

const useEditUserData = () => {
  return useMutation({
    mutationFn: (data: EditUserData) => fetchEditUserData(data),
  });
};

export default useEditUserData;
