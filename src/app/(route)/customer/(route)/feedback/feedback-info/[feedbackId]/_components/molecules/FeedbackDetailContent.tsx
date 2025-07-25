"use client";

import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import React, { useRef, useState } from "react";
import InfoImgSection from "../atoms/InfoImgSection";
import FeedbackHeader from "../atoms/FeedbackHeader";
import { cn } from "@/utils";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";
import { usePathname } from "next/navigation";
import { ReportType } from "@/services/board/types/report";
import useFeedbackRecommendToggle from "../../_hooks/useFeedbackRecommendToggle";
import { CommentItem } from "@/_types/comment";
import { cleanContent } from "@/utils/secure/sanitize";

interface FeedbackDetailContentProps {
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
  feedbackInfoData: FeedbackInfoType;
  setParentsComment: (comment: CommentItem | null) => void;
}

const FeedbackDetailContent = ({
  id,
  adminRole,
  feedbackInfoData,
  setParentsComment,
}: FeedbackDetailContentProps) => {
  const comments = useRef(null);
  const pathname = usePathname();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

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
        dangerouslySetInnerHTML={{
          __html: cleanContent(feedbackInfoData?.content),
        }}
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
  );
};

export default FeedbackDetailContent;
