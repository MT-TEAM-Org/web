"use client";

import React, { useEffect, useRef, useState } from "react";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import { useSearchParams } from "next/navigation";
import { CommentItem } from "@/_types/comment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import NoticeDetailContent from "../molecules/NoticeDetailContent";

interface NoticeMetaProps {
  data: NoticeInfoItemType;
  id: string | string[];
}

const NoticeMeta = ({ data, id }: NoticeMetaProps) => {
  const timeAgo = useTimeAgo(data?.createdAt);
  const comments = useRef(null);
  const adminRole = useAdminRole();
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const commentId = searchParams.get("commentId");
    if (commentId) {
      const commentElement = document.getElementById(commentId);
      if (commentElement) {
        commentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [searchParams]);

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
      <div className="shadow-sm sticky bottom-0 z-50">
        <SendCommentBox
          id={id.toString()}
          type="NOTICE"
          parentsComment={parentsComment}
          setParentsComment={setParentsComment}
        />
      </div>
    </>
  );
};

export default NoticeMeta;
