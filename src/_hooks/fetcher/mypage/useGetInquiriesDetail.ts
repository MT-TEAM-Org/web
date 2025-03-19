"use client";

import getInquiriesDetail from "@/services/mypage/getInquiriesDetail";
import { useQuery } from "@tanstack/react-query";

const useGetInquiriesDetail = (id: string) => {
  return useQuery({
    queryKey: ["inquiriesDetail", id],
    queryFn: () => getInquiriesDetail(id),
    retry: 1,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export default useGetInquiriesDetail;
