import React from "react";
import NoticeItem from "./items/NoticeItem";
import { NoticeContentType } from "../../../_types/NoticeItemType";

interface NoticeListRenderProps {
  noticeListData: { content: NoticeContentType[] };
  searchParams: URLSearchParams;
}

const NoticeListRender = ({
  noticeListData,
  searchParams,
}: NoticeListRenderProps) => {
  return (
    <>
      {noticeListData?.content?.map((noticeListData: NoticeContentType) => (
        <NoticeItem
          key={noticeListData?.id}
          noticeData={noticeListData}
          searchString={searchParams.get("search")}
          searchType={searchParams.get("search_type")}
        />
      ))}
    </>
  );
};

export default NoticeListRender;
