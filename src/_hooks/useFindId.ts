"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  tel: string;
  email: string;
}

const fetchFindId = async (data: FormData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/me/find-id?phoneNumber=${data.tel}`
  );
  return response.data;
};

const useFindId = () => {
  return useMutation({
    mutationFn: (data: FormData) => fetchFindId(data),
  });
};

export default useFindId;
