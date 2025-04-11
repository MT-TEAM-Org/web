"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import useMyPostList from "@/_hooks/useMyPostList";
import MyPagePostItem from "./MyPagePostItem";
import MyPagePostEmpty from "./MypagePostEmpty";
import { useSearchParams } from "next/navigation";
import { PostListConfig, PostListData } from "../_types/postTypes";
import MypagePostSkelton from "./MypagePostSkelton";

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
      <div className="flex flex-col w-full bg-[#FFFFFF] rounded-b-[5px]">
        {pageInfo?.totalElement !== 0 ? (
          content?.map((post: PostListData["content"][number]) => (
            <MyPagePostItem key={post.id} data={post} />
          ))
        ) : (
          <MyPagePostEmpty />
        )}
        {isLoading && <MypagePostSkelton />}
      </div>
    </div>
  );
};

export default MyPagePostList;
