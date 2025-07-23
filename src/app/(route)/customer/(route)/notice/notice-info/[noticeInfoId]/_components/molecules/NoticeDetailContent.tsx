import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import { cn } from "@/utils";
import React, { useRef, useState } from "react";
import NoticeHeader from "../atoms/NoticeHeader";
import InfoImgSection from "../atoms/InfoImgSection";
import usePostNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/usePostNoticeRecommend";
import useDeleteNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteNoticeRecommend";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import { CommentItem } from "@/_types/comment";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface NoticeDetailContentProps {
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
  noticeInfoData: NoticeInfoItemType;
  setParentsComment: (comment: CommentItem | null) => void;
}

const NoticeDetailContent = ({
  id,
  adminRole,
  noticeInfoData,
  setParentsComment,
}: NoticeDetailContentProps) => {
  const comments = useRef(null);
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const { mutate: noticeAddRecommend } = usePostNoticeRecommend();
  const { mutate: noticeDeleteRecommend } = useDeleteNoticeRecommend();

  const handleFeedbackCommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = noticeInfoData?.isRecommended;
    const feedbackAction = isRecommended
      ? noticeDeleteRecommend
      : noticeAddRecommend;

    feedbackAction(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["noticeInfo", id] });
      },
    });
  };
  return (
    <div
      className={cn(
        "w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
        "tablet:w-full",
        "mobile:w-full mobile:px-4 mobile:py-3 mobile:gap-3"
      )}
    >
      <NoticeHeader data={noticeInfoData} />
      <hr />
      <InfoImgSection data={noticeInfoData} />

      <div
        className={cn(
          "w-full max-w-[672px] min-h-[48px] font-medium text-[16px] leading-6 tracking-[-0.02em] text-gray7",
          "mobile:min-h-auto"
        )}
        dangerouslySetInnerHTML={{ __html: noticeInfoData?.content }}
      />
      <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
        <RecommendButton
          handleCommend={handleFeedbackCommend}
          recommendCount={noticeInfoData?.recommendCount}
          isRecommend={noticeInfoData?.isRecommended}
        />
      </div>
      <BoardComment
        id={id.toString()}
        publicId={noticeInfoData?.publicId}
        ref={comments}
        setParentsComment={setParentsComment}
        type="NOTICE"
      />
      <PostNavigation
        nextId={noticeInfoData?.nextId}
        previousId={noticeInfoData?.previousId}
        currentPath={pathname}
      />
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
};

export default NoticeDetailContent;
