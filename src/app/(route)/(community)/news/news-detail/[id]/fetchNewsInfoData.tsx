"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getNewsItemInfo = async () => {
  const response = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/13`,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

const useGetNewsItemInfo = () => {
  return useQuery({
    queryKey: ["getNewsInfo"],
    queryFn: getNewsItemInfo,
  });
};

export default useGetNewsItemInfo;
