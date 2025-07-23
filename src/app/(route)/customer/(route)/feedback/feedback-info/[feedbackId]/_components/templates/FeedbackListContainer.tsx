import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import React from "react";
import FeedbackListBox from "../organisms/FeedbackListBox";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useFeedbackQueryParams from "../../../../_hooks/useFeedbackQueryParams";

interface FeedbackListContainerProps {
  searchParams: URLSearchParams;
  adminRole?: "USER" | "ADMIN" | undefined;
}

const FeedbackListContainer = ({
  searchParams,
  adminRole,
}: FeedbackListContainerProps) => {
  const feedbackOption = useFeedbackQueryParams();

  // 개선요청 리스트
  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);

  return (
    <>
      {/* 툴바 */}
      <CustomerTalkToolbar
        showOptions={true}
        adminChecker={adminRole}
        paginationData={feedbackDataList?.pageInfo}
      />

      {/* 리스트 */}
      <FeedbackListBox
        feedbackDataList={feedbackDataList}
        isLoading={isLoading}
        isError={isError}
        searchParams={searchParams}
      />
    </>
  );
};

export default FeedbackListContainer;
