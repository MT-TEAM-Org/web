"use client";

import axios from "axios";
import { PostListConfig } from "@/app/(route)/mypage/posts/_types/postTypes";

const getMyCommentList = async (postListConfig: PostListConfig) => {
  const queryString = new URLSearchParams(
    postListConfig as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/comment?${queryString}`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getMyCommentList;
