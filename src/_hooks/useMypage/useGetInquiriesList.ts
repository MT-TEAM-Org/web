"use client";

import getInquiriesList from "@/services/mypage/getInquiriesList";
import { useQuery } from "@tanstack/react-query";
import { InquiriesListConfig } from "@/app/(route)/mypage/inquiries/_types/inquiries";

const useGetInquiriesList = (data: InquiriesListConfig) => {
  return useQuery({
    queryFn: () => getInquiriesList(data),
    queryKey: ["inquiriesList", data],
    retry: 1,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export default useGetInquiriesList;
