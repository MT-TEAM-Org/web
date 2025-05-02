"use client";
import BoardDetail from "./boardDetail";
import PostItem from "@/app/(route)/(community)/_components/PostItem";
import useGetBoardData from "@/_hooks/getBoardData";
import { CommunityToolbar } from "@/app/(route)/(community)/_components/CommunityToolbar";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import MobileDetailGnb from "@/app/(route)/(community)/_components/gnb/mobileDetailGnb";
import LeftSidebar from "@/app/(route)/(community)/_components/LeftSidebar";

interface BoardDetailPageProps {
  boardId: string;
  boardType: string;
  categoryType: string;
}

const BoardDetailPage = ({
  boardId,
  boardType,
  categoryType,
}: BoardDetailPageProps) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const searchQuery = searchParams.get("search");
  const searchType = searchParams.get("search_type");
  const orderType = searchParams.get("orderType") || "CREATE";

  const { data: boardData, isLoading } = useGetBoardData({
    boardType: boardType?.toUpperCase(),
    categoryType: categoryType,
    boardId: boardId,
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
        "tablet:w-full tablet:max-w-[688px] tablet:mx-auto",
        "mobile:mx-auto mobile:w-full mobile:max-w-[768px]"
      )}
    >
      <div className="w-full max-w-[768px] min-w-[360px] hidden mobile:block mobile:w-full sticky top-0 z-10">
        <MobileDetailGnb boardId={boardId} />
      </div>
      <div className="hidden tablet:block sticky top-0 tablet:z-20">
        <LeftSidebar />
      </div>
      <div
        className="w-full pc:min-w-[720px] min-w-[688px] min-h-[100px] tablet:w-full tablet:max-w-[688px] tablet:flex tablet:flex-col tablet:justify-center tablet:items-center tablet:mx-auto
mobile:w-full mobile:max-w-[768px] mobile:min-w-[360px]"
      >
        <BoardDetail boardId={boardId} />
      </div>
      <div className="w-full tablet:w-full tablet:max-w-[688px] mobile:hidden mt-[12px]">
        <CommunityToolbar boardType={boardType} pageInfo={pageInfo} />
      </div>
      <div className="w-full min-h-[120px] tablet:w-full tablet:max-w-[688px] tablet:mx-auto bg-white mobile:mt-[16px]">
        <PostItem
          boardType={boardType}
          categoryType={categoryType}
          boardData={boardData}
          isDetailPage={true}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default BoardDetailPage;
