import NoticeItem from "@/app/(route)/customer/(route)/notice/_components/items/NoticeItem";
import React from "react";
import { NoticeItemType } from "@/app/(route)/customer/_types/NoticeItemType";

interface NoticeListProps {
  noticeDataList: NoticeItemType;
  searchParams: URLSearchParams;
}

const NoticeList = ({ noticeDataList, searchParams }: NoticeListProps) => {
  return (
    <>
      {/* 공지사항 렌더링 */}
      {noticeDataList?.content?.map((noticeData) => (
        <NoticeItem
          noticeData={noticeData}
          key={`notice-${noticeData.id}`}
          searchString={searchParams.get("search")}
          searchType={searchParams.get("search_type")}
        />
      ))}
    </>
  );
};

export default NoticeList;
