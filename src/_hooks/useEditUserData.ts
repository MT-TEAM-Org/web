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
        Authorization: localStorage.getItem("accessToken"),
        // Bearer 접두사를 붙이면 접두사가 두 번 붙는 문제가 발생함
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
