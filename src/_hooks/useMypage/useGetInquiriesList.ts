"use client";

import getInquiriesList from "@/services/mypage/getInquiriesList";
import { useQuery } from "@tanstack/react-query";

interface InquiryData {
  page: number;
  size: number;
  orderType: "ANSWERED";
  searchType: "CONTENT" | "COMMENT";
  search: string;
}

const useGetInquiriesList = (data: InquiryData) => {
  return useQuery({
    queryFn: () => getInquiriesList(data),
    queryKey: ["inquiriesList", data],
    retry: 1,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export default useGetInquiriesList;
