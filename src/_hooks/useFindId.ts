"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./useToast";

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
  const { info } = useToast();
  return useMutation({
    mutationFn: (data: FormData) => fetchFindId(data),
    onError: () => {
      info(
        "해당 번호로 가입된 계정이 없습니다.",
        "가입시 핸드폰 번호를 확인해주세요."
      );
    },
  });
};

export default useFindId;
