"use client";

import React, { useState } from "react";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import { CommentItem } from "@/_types/comment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import NoticeDetailContent from "../molecules/NoticeDetailContent";
import { cn } from "@/utils";

interface NoticeMetaProps {
  data: NoticeInfoItemType;
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
}

const NoticeMeta = ({ data, id, adminRole }: NoticeMetaProps) => {
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  return (
    <>
      {/* mobile gnb */}
      <NewsDetailGnb title={data?.title} type="notice" />

      {/* detail content */}
      <NoticeDetailContent
        id={id}
        adminRole={adminRole}
        noticeInfoData={data}
        setParentsComment={setParentsComment}
      />

      {/* send comment */}
      <SendCommentBox
        id={id.toString()}
        type="NOTICE"
        parentsComment={parentsComment}
        setParentsComment={setParentsComment}
      />
    </>
  );
};

export default NoticeMeta;
