import { FeedbackContentType } from "./FeedbackItemType";
import { NoticeContentType } from "./NoticeItemType";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";

type LoadingType = {
  isLoading: boolean;
  loading: boolean;
};

type ErrorType = {
  isError: boolean;
  error: boolean;
};

export interface ItemContainerProps {
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