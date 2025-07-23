import React from "react";
import NoticeInfoItemSkeleton from "../NoticeInfoItemSkeleton";
import NoticeMeta from "../organisms/NoticeMeta";

interface NoticeMetaContainerProps {
  infoIsLoading: boolean;
  infoIsError: boolean;
  noticeInfoData: any;
  id: string | string[];
}

const NoticeMetaContainer = ({
  infoIsLoading,
  infoIsError,
  noticeInfoData,
  id,
}: NoticeMetaContainerProps) => {
  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeMeta data={noticeInfoData} id={id} />
      )}
    </>
  );
};

export default NoticeMetaContainer;
