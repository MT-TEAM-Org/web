"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getNewsItemInfo = async ({ id }: { id: string }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/${id}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data?.data;
};

const useGetNewsInfoData = (id: string) => {
  return useQuery({
    queryKey: ["getNewsInfo", id],
    queryFn: () => getNewsItemInfo({ id }),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export default useGetNewsInfoData;
