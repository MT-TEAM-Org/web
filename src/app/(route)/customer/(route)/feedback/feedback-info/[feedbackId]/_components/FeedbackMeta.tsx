"use client";

import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import { cn } from "@/utils";
import React, { useRef, useState } from "react";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { ReportType } from "@/services/board/types/report";
import { CommentItem } from "@/_types/comment";
import { usePathname } from "next/navigation";
import useFeedbackRecommendToggle from "../_hooks/useFeedbackRecommendToggle";
import { getYouTubeEmbedUrl } from "../_utils/getYouTubeEmbedUrl";
import FeedbackHeader from "./atoms/FeedbackHeader";
import { FeedbackInfoType } from "../../../_types/FeedbackInfoType";
import InfoImgSection from "./atoms/InfoImgSection";

// TODO: 리팩터링 테스트, 추가 리팩터링 필요

interface FeedbackMetaProps {
  feedbackInfoData: FeedbackInfoType;
  id: string | string[];
  adminRole: any;
}

const FeedbackMeta = ({
  feedbackInfoData,
  id,
  adminRole,
}: FeedbackMetaProps) => {
  console.log("feedbackInfoData: ", feedbackInfoData);

  const comments = useRef(null);
  const pathname = usePathname();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  const reportData = {
    reportedPublicId: feedbackInfoData?.publicId,
    reportType: "IMPROVEMENT" as ReportType,
    reportedContentId: Number(id),
  };

  const { handleRecommend } = useFeedbackRecommendToggle(
    id,
    adminRole,
    feedbackInfoData,
    setIsSignInModalOpen
  );

  return (
    <>
      <div className={cn("pc:hidden tablet:hidden")}>
        <NewsDetailGnb
          title={feedbackInfoData?.title}
          type="feedback"
          data={feedbackInfoData}
          id={Number(id)}
        />
      </div>
      <div
        className={cn(
          "w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-soft-md bg-white",
          "tablet:max-w-full tablet:w-full",
          "mobile:max-w-full mobile:w-full mobile:p-4 mobile:gap-3"
        )}
      >
        <FeedbackHeader
          id={id}
          adminRole={adminRole}
          feedbackInfoData={feedbackInfoData}
        />
        <hr />
        <InfoImgSection feedbackInfoData={feedbackInfoData} />
        <div
          className="text-[16px] leading-6 tracking-[-0.02em] text-gray7 mobile:text-[14px]"
          dangerouslySetInnerHTML={{ __html: feedbackInfoData?.content }}
        />
        <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
          <RecommendButton
            handleCommend={handleRecommend}
            recommendCount={feedbackInfoData?.recommendCount}
            isRecommend={feedbackInfoData?.isRecommended}
          />
        </div>
        <PostAction type="community" reportData={reportData} />
        <BoardComment
          id={id as string}
          publicId={feedbackInfoData?.publicId}
          ref={comments}
          setParentsComment={setParentsComment}
          type="IMPROVEMENT"
        />
        <PostNavigation
          nextId={feedbackInfoData?.nextId}
          previousId={feedbackInfoData?.previousId}
          currentPath={pathname}
        />
        <SignInModalPopUp
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
        />
      </div>
      <div
        className={cn(
          "shadow-soft-md sticky bottom-0 z-50",
          "mobile:shadow-none mobile:border-b"
        )}
      >
        <SendCommentBox
          id={id.toString()}
          type="IMPROVEMENT"
          parentsComment={parentsComment}
          setParentsComment={setParentsComment}
        />
      </div>
    </>
  );
};

export default FeedbackMeta;
