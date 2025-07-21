import FeedbackListLoading from "../(route)/feedback/_components/status/FeedbackListLoading";
import NoticeItemSkeleton from "../(route)/notice/_components/status/NoticeItemSkeleton";
import { FeedbackContentType } from "../_types/FeedbackItemType";
import { NoticeContentType } from "../_types/NoticeItemType";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";
import FeedbackListRenderer from "../(route)/feedback/_components/FeedbackListRender";
import NoticeListRender from "../(route)/notice/_components/NoticeListRender";

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

// 타입별 설정을 객체로 관리
export const CUSTOMER_TYPE_CONFIG = {
  feedback: {
    emptyTitle: "개선요청 사항이",
    LoadingComponent: FeedbackListLoading,
    ListComponent: ({
      dataList,
      slicedDataList,
      searchParams,
    }: {
      dataList: ItemContainerProps["dataList"];
      slicedDataList: NoticeContentType[];
      searchParams: URLSearchParams;
    }) => (
      <FeedbackListRenderer
        notices={slicedDataList}
        feedbacks={dataList.content as FeedbackContentType[]}
        search={searchParams.get("search") || ""}
        searchType={searchParams.get("search_type") || ""}
      />
    ),
  },
  notice: {
    emptyTitle: "공지사항이",
    LoadingComponent: NoticeItemSkeleton,
    ListComponent: ({
      dataList,
      searchParams,
    }: {
      dataList: ItemContainerProps["dataList"];
      searchParams: URLSearchParams;
    }) => (
      <NoticeListRender
        noticeListData={dataList as { content: NoticeContentType[] }}
        searchParams={searchParams}
      />
    ),
  },
} as const;

export type ItemStrategy = typeof CUSTOMER_TYPE_CONFIG;
