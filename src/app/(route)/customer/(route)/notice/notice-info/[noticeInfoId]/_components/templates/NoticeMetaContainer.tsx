import React from "react";
import NoticeInfoItemSkeleton from "../atoms/NoticeInfoItemSkeleton";
import NoticeMeta from "../organisms/NoticeMeta";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";

interface NoticeMetaContainerProps {
  noticeInfoData: NoticeInfoItemType;
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
  isLoading: boolean;
  isError: boolean;
}

const NoticeMetaContainer = ({
  noticeInfoData,
  id,
  adminRole,
  isLoading,
  isError,
}: NoticeMetaContainerProps) => {
  return (
    <>
      {isLoading || isError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeMeta data={noticeInfoData} id={id} adminRole={adminRole} />
      )}
    </>
  );
};

export default NoticeMetaContainer;
