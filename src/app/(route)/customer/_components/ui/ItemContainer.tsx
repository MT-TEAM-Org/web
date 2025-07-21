import { FeedbackContentType } from "../../_types/FeedbackItemType";
import { NoticeContentType } from "../../_types/NoticeItemType";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";
import { usePageChangeHandler } from "../../_hooks/usePageChangeHandler";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { cn } from "@/utils";
import { CUSTOMER_TYPE_CONFIG } from "../../_utils/CUSTOMER_TYPE_CONFIG";
import RenderContent from "./RenderContent";

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
  const handlePageChange = usePageChangeHandler(dataList?.pageInfo?.totalPage);

  const config = CUSTOMER_TYPE_CONFIG[type];
  const { emptyTitle, LoadingComponent, ListComponent } = config;

  // 로딩 상태
  const isLoadingState = loading.loading || loading.isLoading;
  // 에러 또는 빈 데이터 상태
  const isEmptyState =
    error.error || error.isError || dataList?.content?.length === 0;
  // 페이지네이션 표시 여부
  const shouldShowPagination = dataList?.pageInfo.totalPage > 0;

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
      <RenderContent
        isLoadingState={isLoadingState}
        isEmptyState={isEmptyState}
        LoadingComponent={LoadingComponent}
        ListComponent={ListComponent}
        dataList={dataList}
        slicedDataList={slicedDataList}
        searchParams={searchParams}
        emptyTitle={emptyTitle}
      />

      {shouldShowPagination && (
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
