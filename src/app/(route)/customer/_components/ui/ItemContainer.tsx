import { cn } from "@/utils";
import React from "react";
import EmptyItem from "../common/EmptyItem";
import { FeedbackContentType } from "../../_types/FeedbackItemType";
import { NoticeContentType } from "../../_types/NoticeItemType";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";
import FeedbackListLoading from "../../(route)/feedback/_components/status/FeedbackListLoading";
import FeedbackListRenderer from "../../(route)/feedback/_components/FeedbackListRender";
import { usePageChangeHandler } from "../../_hooks/usePageChangeHandler";
import NoticeItemSkeleton from "../../(route)/notice/_components/status/NoticeItemSkeleton";
import NoticeListRender from "../../(route)/notice/_components/NoticeListRender";

type LoadingType = {
  isLoading: boolean;
  loading: boolean;
};

type ErrorType = {
  isError: boolean;
  error: boolean;
};

interface ItemContainerProps {
  type: "feedback" | "notice";
  dataList: {
    content: FeedbackContentType[] | NoticeContentType[];
    pageInfo: PageInfo;
  };
  loading: LoadingType;
  error: ErrorType;
  slicedDataList: NoticeContentType[];
  searchParams: URLSearchParams;
}

const ItemContainer = ({
  type,
  dataList,
  loading,
  error,
  slicedDataList,
  searchParams,
}: ItemContainerProps) => {
  // 페이지네이션 핸들러
  const handlePageChange = usePageChangeHandler(dataList?.pageInfo?.totalPage);

  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-b-[5px] overflow-hidden bg-white",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        !!dataList?.content?.length &&
          "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
      )}
    >
      {loading.loading || loading.isLoading ? (
        type === "feedback" ? (
          <FeedbackListLoading />
        ) : (
          <NoticeItemSkeleton />
        )
      ) : error.error || error.isError || dataList?.content?.length === 0 ? (
        <EmptyItem
          title={type === "feedback" ? "개선요청 사항이" : "공지사항이"}
        />
      ) : type === "feedback" ? (
        <FeedbackListRenderer
          notices={slicedDataList as NoticeContentType[]}
          feedbacks={dataList.content as FeedbackContentType[]}
          search={searchParams.get("search")}
          searchType={searchParams.get("search_type")}
        />
      ) : (
        <NoticeListRender
          noticeListData={dataList as { content: NoticeContentType[] }}
          searchParams={searchParams}
        />
      )}
      {dataList?.pageInfo.totalPage > 0 && (
        <div
          className={cn(
            "hidden",
            "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
          )}
        >
          <Pagination
            pageInfo={dataList?.pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ItemContainer;
