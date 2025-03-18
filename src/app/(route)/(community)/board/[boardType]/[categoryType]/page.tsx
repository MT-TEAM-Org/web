"use client";

import { use } from "react";
import { CommunityToolbar } from "../../../_components/CommunityToolbar";
import PostItem from "../../../_components/PostItem";
import useGetBoardData from "@/_hooks/getBoardData";
import PostItemSkeleton from "../../../_components/PostItemSkelton";
import { useSearchParams } from "next/navigation";

interface categiotyType {
  boardType: string;
  categoryType: string;
}
export default function Category({
  params,
}: {
  params: Promise<categiotyType>;
}) {
  const unwrappedParams = use(params);
  const { boardType, categoryType } = unwrappedParams;

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const searchQuery = searchParams.get("search");
  const searchType = searchParams.get("search_type");

  const { data: boardData, isLoading } = useGetBoardData({
    boardType: boardType?.toUpperCase(),
    categoryType: categoryType,
    orderType: "CREATE",
    page: Number(currentPage),
    searchType: searchQuery ? searchType : undefined,
    search: searchQuery,
  });

  if (isLoading) {
    return <PostItemSkeleton />;
  }

  const pageInfo = boardData?.pageInfo;

  return (
    <div className="w-[720px] flex justify-center bg-[#FAFAFA]">
      <div className="w-full min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <CommunityToolbar boardType={boardType} pageInfo={pageInfo} />
        <PostItem
          boardType={boardType}
          categoryType={categoryType}
          boardData={boardData}
        />
      </div>
    </div>
  );
}
