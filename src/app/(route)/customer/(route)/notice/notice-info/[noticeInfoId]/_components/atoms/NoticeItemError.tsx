import { NoticeItemType } from "@/app/(route)/customer/_types/NoticeItemType";
import React from "react";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";

interface NoticeItemErrorProps {
  isError: boolean;
  noticeDataList: NoticeItemType;
}

const NoticeItemError = ({ isError, noticeDataList }: NoticeItemErrorProps) => {
  return (
    (noticeDataList?.content?.length === 0 || isError) && (
      <>
        <EmptyItem title="공지사항이" />
      </>
    )
  );
};

export default NoticeItemError;
