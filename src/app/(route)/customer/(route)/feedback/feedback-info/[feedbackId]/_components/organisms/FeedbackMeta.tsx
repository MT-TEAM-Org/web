"use client";

import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import { cn } from "@/utils";
import React, { useState } from "react";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { CommentItem } from "@/_types/comment";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";
import FeedbackDetailContent from "../molecules/FeedbackDetailContent";

interface FeedbackMetaProps {
  feedbackInfoData: FeedbackInfoType;
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
}

const FeedbackMeta = ({
  feedbackInfoData,
  id,
  adminRole,
}: FeedbackMetaProps) => {
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  return (
    <>
      {/* mobile gnb */}
      <NewsDetailGnb
        title={feedbackInfoData?.title}
        type="feedback"
        data={feedbackInfoData}
        id={Number(id)}
      />

      {/* detail content */}
      <FeedbackDetailContent
        id={id}
        adminRole={adminRole}
        feedbackInfoData={feedbackInfoData}
        setParentsComment={setParentsComment}
      />

      {/* send comment */}
      <SendCommentBox
        id={id.toString()}
        type="IMPROVEMENT"
        parentsComment={parentsComment}
        setParentsComment={setParentsComment}
      />
    </>
  );
};

export default FeedbackMeta;
