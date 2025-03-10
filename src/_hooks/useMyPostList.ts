"use client";

import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface PostListConfig {
  page: number;
  size: number;
  orderType: "CREATE" | "RECOMMEND" | "COMMENT";
  searchType: "TITLE" | "CONTENT" | "TITLE_CONTENT" | "COMMENT";
  search: string;
}

const fetchMyPostList = async (postListConfig: PostListConfig) => {
  const queryString = new URLSearchParams(
    postListConfig as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/board?${queryString}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const useMyPostList = (postListConfig: PostListConfig) => {
  return useQuery({
    queryFn: () => fetchMyPostList(postListConfig),
    queryKey: ["myPostList", postListConfig],
    retry: 1,
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export default useMyPostList;
