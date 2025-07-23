import React from "react";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import NoticeListBox from "../organisms/NoticeListBox";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useNoticeQueryParams from "../../_hooks/useNoticeQueryParams";

interface NoticeListContainerProps {
  searchParams: URLSearchParams;
  adminRole: "ADMIN" | "USER" | undefined;
}

const NoticeListContainer = ({
  searchParams,
  adminRole,
}: NoticeListContainerProps) => {
  const noticeOption = useNoticeQueryParams();

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <>
      {/* 툴바 */}
      <CustomerTalkToolbar
        showOptions={false}
        paginationData={noticeListData?.pageInfo}
        adminChecker={adminRole}
      />

      {/* 리스트 */}
      <NoticeListBox
        isLoading={isLoading}
        isError={isError}
        noticeListData={noticeListData}
        searchParams={searchParams}
      />
    </>
  );
};

export default NoticeListContainer;
