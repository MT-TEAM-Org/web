"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNewsDataList = async (category?: string) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: category || 'BASEBALL',
      orderType: "DATE",
      page: 1,
      size: 10,
    },
  });
  return response.data.data.list.content;
};

const useGetNewsDataList = (category?: string) => {
  return useQuery({
    queryKey: ["newsDataList", category || "all"],
    queryFn: () => fetchNewsDataList(category),
    retry: 2,
  });
};

export default useGetNewsDataList;