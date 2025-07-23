import React from "react";
import NoticeInfoItemSkeleton from "../NoticeInfoItemSkeleton";
import NoticeMeta from "../organisms/NoticeMeta";

interface NoticeMetaContainerProps {
  infoIsLoading: boolean;
  infoIsError: boolean;
  noticeInfoData: any;
  numberId: number;
}

const NoticeMetaContainer = ({
  infoIsLoading,
  infoIsError,
  noticeInfoData,
  numberId,
}: NoticeMetaContainerProps) => {
  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeMeta data={noticeInfoData} id={numberId} />
      )}
    </>
  );
};

export default NoticeMetaContainer;
