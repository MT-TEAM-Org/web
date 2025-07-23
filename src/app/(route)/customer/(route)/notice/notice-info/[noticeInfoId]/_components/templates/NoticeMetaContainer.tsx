import React from "react";
import NoticeInfoItemSkeleton from "../NoticeInfoItemSkeleton";
import NoticeMeta from "../organisms/NoticeMeta";

interface NoticeMetaContainerProps {
  infoIsLoading: boolean;
  infoIsError: boolean;
  noticeInfoData: any;
  adminRole: "USER" | "ADMIN" | undefined;
  id: string | string[];
}

const NoticeMetaContainer = ({
  infoIsLoading,
  infoIsError,
  noticeInfoData,
  adminRole,
  id,
}: NoticeMetaContainerProps) => {
  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeMeta data={noticeInfoData} id={id} adminRole={adminRole} />
      )}
    </>
  );
};

export default NoticeMetaContainer;
