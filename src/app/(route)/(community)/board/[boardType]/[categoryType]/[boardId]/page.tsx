"use client";
import { use } from "react";
import BoardDetail from "./_components/boardDetail";
import PostItem from "@/app/(route)/(community)/_components/PostItem";
import useGetBoardData from "@/_hooks/getBoardData";
import { CommunityToolbar } from "@/app/(route)/(community)/_components/CommunityToolbar";
import { useSearchParams } from "next/navigation";
import PostItemSkeleton from "@/app/(route)/(community)/_components/PostItemSkelton";

interface BoardDetailProps {
  boardType: string;
  categoryType: string;
  boardId: string;
}

const BoardDetailPage = ({ params }: { params: Promise<BoardDetailProps> }) => {
  const unwrappedParams = use(params);
  const { boardId, boardType, categoryType } = unwrappedParams;
  console.log(unwrappedParams);

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

  const pageInfo = boardData?.pageInfo;

  return (
    <div className="w-full">
      <div className="w-full min-h-[100px]">
        <BoardDetail boardId={boardId} />
      </div>
      <div>
        <CommunityToolbar boardType={boardType} pageInfo={pageInfo} />
      </div>
      <div className="w-full min-h-[120px]">
        <PostItem
          boardType={boardType}
          categoryType={categoryType}
          boardData={boardData}
        />
      </div>
    </div>
  );
};

export default BoardDetailPage;
