"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NewsDataParams {
  category?: string;
  orderType?: "DATE" | "COMMENT" | "VIEW";
  pageNum?: number;
}

const fetchSortedNewsDataList = async ({category, orderType, pageNum}: NewsDataParams ) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: category || 'BASEBALL',
      orderType: orderType || "DATE",
      page: pageNum|| 1,
      size: 10,
    },
  });
  return response.data.data.list.content;
};

// 뉴스 정렬 API
const useSortedNewsDataList = ({category, orderType, pageNum}: NewsDataParams) => {
  return useQuery({
    queryKey: ["newsDataList", category || "all", orderType || "DATE", pageNum || 1],
    queryFn: () => fetchSortedNewsDataList({category, orderType, pageNum}),
    retry: 1,
  });
};

export default useSortedNewsDataList;