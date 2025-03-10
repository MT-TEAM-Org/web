"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import useMyPostList from "@/_hooks/useMyPostList";
import MyPagePostItem from "./MyPagePostItem";
import MyPagePostEmpty from "./MypagePostEmpty";
import { useSearchParams } from "next/navigation";

interface PostListConfig {
  page: number;
  size: number;
  orderType: "CREATE" | "RECOMMEND" | "COMMENT";
  searchType: "TITLE" | "CONTENT" | "TITLE_CONTENT" | "COMMENT";
  search: string;
}

interface PostListData {
  content: {
    id: number;
    boardType: string;
    categoryType: string;
    title: string;
    createdIp: string;
    thumbnail: string;
    publicId: string;
    nickname: string;
    commentCount: number;
    createDate: string;
    lastModifiedDate: string;
  }[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
}

const MyPagePostList = () => {
  const searchParams = useSearchParams();
  const postOptions: PostListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 5,
    orderType:
      (searchParams.get("order_type") as PostListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("search_type") as PostListConfig["searchType"]) ||
      "CONTENT",
    search: searchParams.get("search") || "",
  };
  const { data, isLoading } = useMyPostList(postOptions);
  const { content, pageInfo } = data?.data?.list || {};

  return (
    <div>
      <MypageToolbar mode="posts" pageInfo={pageInfo} />
      <div className="flex flex-col items-center w-full bg-[#FFFFFF] rounded-b-[5px]">
        {pageInfo?.totalElement !== 0 ? (
          content?.map((post: PostListData["content"][number]) => (
            <MyPagePostItem key={post.id} data={post} />
          ))
        ) : (
          <MyPagePostEmpty />
        )}
      </div>
    </div>
  );
};

export default MyPagePostList;
