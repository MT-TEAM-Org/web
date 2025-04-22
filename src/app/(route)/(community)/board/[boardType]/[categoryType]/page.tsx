"use client";

import { use } from "react";
import { CommunityToolbar } from "../../../_components/CommunityToolbar";
import PostItem from "../../../_components/PostItem";
import useGetBoardData from "@/_hooks/getBoardData";
import PostItemSkeleton from "../../../_components/PostItemSkelton";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";

interface category {
  boardType: string;
  categoryType: string;
}
export default function Category({ params }: { params: Promise<category> }) {
  const unwrappedParams = use(params);
  const { boardType, categoryType } = unwrappedParams;

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const searchQuery = searchParams.get("search");
  const searchType = searchParams.get("search_type");
  const orderType = searchParams.get("orderType") || "CREATE";

  const { data: boardData, isLoading } = useGetBoardData({
    boardType: boardType?.toUpperCase(),
    categoryType: categoryType,
    orderType: orderType,
    page: Number(currentPage),
    searchType: searchQuery ? searchType : undefined,
    search: searchQuery,
  });

  if (isLoading) {
    return <PostItemSkeleton />;
  }

  const pageInfo = boardData?.pageInfo;

  return (
    <div className="w-full min-w-[720px] flex justify-center bg-[#FAFAFA] mb-[46px] min-h-[100px] tablet:w-full mobile:w-full mobile:max-w-[768px]">
      <div
        className={cn(
          "w-full min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto sticky top-0",
          "tablet:w-full tablet:mx-auto tablet:flex tablet:flex-col tablet:items-center",
          "mobile:w-full mobile:max-w-[768px]"
        )}
      >
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
