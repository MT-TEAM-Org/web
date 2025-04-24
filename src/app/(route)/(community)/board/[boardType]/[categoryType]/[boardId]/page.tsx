"use client";
import { use } from "react";
import BoardDetail from "./_components/boardDetail";
import PostItem from "@/app/(route)/(community)/_components/PostItem";
import useGetBoardData from "@/_hooks/getBoardData";
import { CommunityToolbar } from "@/app/(route)/(community)/_components/CommunityToolbar";
import { useSearchParams } from "next/navigation";
import PostItemSkeleton from "@/app/(route)/(community)/_components/PostItemSkelton";
import { cn } from "@/utils";
import MobileDetailGnb from "@/app/(route)/(community)/_components/gnb/mobileDetailGnb";
import LeftSidebar from "@/app/(route)/(community)/_components/LeftSidebar";

interface BoardDetailProps {
  boardType: string;
  categoryType: string;
  boardId: string;
}

const BoardDetailPage = ({ params }: { params: Promise<BoardDetailProps> }) => {
  const unwrappedParams = use(params);
  const { boardId, boardType, categoryType } = unwrappedParams;

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
    <div
      className={cn(
        "w-full max-w-[720px]",
        "tablet:max-w-[688px] tablet:mx-auto",
        "mobile:mx-auto mobile:w-full mobile:max-w-[768px] mobile:overflow-x-hidden"
      )}
    >
      <div className="w-full max-w-[768px] min-w-[360px] hidden mobile:block mobile:w-full sticky top-0 z-10">
        <MobileDetailGnb boardId={boardId} />
      </div>
      <div className="hidden tablet:block sticky top-0 z-10">
        <LeftSidebar />
      </div>
      <div
        className="w-full min-w-[720px] min-h-[100px] tablet:flex tablet:flex-col tablet:justify-center tablet:items-center tablet:mx-auto
"
      >
        <BoardDetail boardId={boardId} />
      </div>
      <div className="w-full tablet:w-full tablet:max-w-[688px] mobile:hidden">
        <CommunityToolbar boardType={boardType} pageInfo={pageInfo} />
      </div>
      <div className="w-full min-h-[120px] tablet:w-full tablet:max-w-[688px] tablet:mx-auto mobile:bg-white">
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
