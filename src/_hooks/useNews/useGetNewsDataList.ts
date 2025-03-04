"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NewsDataProps {
  category?: string;
  page?: string;
}

const fetchNewsDataList = async ({category, page}: NewsDataProps = {}) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: category || 'BASEBALL',
      orderType: "DATE",
      page: page || 1,
      size: 10,
    },
  });
  return response.data.data.list.content;
};

const useGetNewsDataList = ({category, page}: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", category || "BASEBALL", page || 1],
    queryFn: () => fetchNewsDataList({category, page}),
    retry: 1,
  });
};

export default useGetNewsDataList;