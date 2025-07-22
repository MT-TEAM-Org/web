"use client";

import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import { cn } from "@/utils";
import React, { useRef, useState } from "react";
import StatusSaver from "./StatusSaver";
import Image from "next/image";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import { ReportType } from "@/services/board/types/report";
import { CommentItem } from "@/_types/comment";
import { usePathname } from "next/navigation";

type state = {
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FeedbackMetaProps {
  feedbackInfoData: any;
  infoId: number;
  id: string | string[];
  adminRole: string | undefined;
  timeAgo: string;
  handleFeedbackCommend: () => void;
  state: state;
}

const FeedbackMeta = ({
  feedbackInfoData,
  infoId,
  id,
  adminRole,
  timeAgo,
  handleFeedbackCommend,
  state,
}: FeedbackMetaProps) => {
  console.log(feedbackInfoData);
  const statusBoxClass = "w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] flex";

  const pathname = usePathname();

  const comments = useRef(null);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  const infoItems = [
    { label: "조회수", value: feedbackInfoData?.viewCount },
    { label: "댓글", value: feedbackInfoData?.commentCount },
    { label: "추천", value: feedbackInfoData?.recommendCount },
  ];

  const statusContent = {
    RECEIVED: (
      <div className={cn(statusBoxClass, "bg-gray1")}>
        <p className="font-bold text-[14px] leading-5 text-gray7">접수 완료</p>
      </div>
    ),
    COMPLETED: (
      <div className={cn(statusBoxClass, "bg-bg0")}>
        <p className="font-bold text-[14px] leading-5 text-gra">개선 완료</p>
      </div>
    ),
  };

  const link = feedbackInfoData?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  const youtubeEmbedUrl = link && getYouTubeEmbedUrl(link);

  const reportData = {
    reportedPublicId: feedbackInfoData?.publicId,
    reportType: "IMPROVEMENT" as ReportType,
    reportedContentId: Number(id),
  };

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
        {adminRole === "ADMIN" && (
          <StatusSaver id={infoId} status={feedbackInfoData?.status} />
        )}
        <div
          className={cn(
            "w-full flex gap-2 flex-col",
            adminRole !== "ADMIN" || adminRole === undefined
              ? "min-h-[56px]"
              : "",
            "mobile:gap-1"
          )}
        >
          <div>
            {(adminRole !== "ADMIN" || adminRole === undefined) &&
              statusContent[feedbackInfoData?.status]}
          </div>
          <h1
            className={cn(
              "font-bold text-[18px] leading-7 tracking-[-0.72px]",
              "mobile:text-[16px] mobile:leading-6"
            )}
          >
            {feedbackInfoData?.title}
          </h1>
          <div
            className={cn(
              "w-full max-h-[20px] flex gap-4",
              "tablet:justify-between",
              "mobile:flex-wrap mobile:max-h-fit mobile:gap-1"
            )}
          >
            <div
              className={cn(
                "min-w-[421px] min-h-[20px] flex gap-2 text-[14px] leading-5 text-gray6",
                "mobile:min-w-0 mobile:flex-wrap mobile:text-[12px]"
              )}
            >
              <p className="font-bold">고객센터</p>
              <p>개선요청</p>
              <p>{timeAgo}</p>
              {infoItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <p className="font-bold">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div
              className={cn(
                "min-w-[235px] min-h-[20px] flex justify-end gap-1 text-[14px] leading-5 text-gray6",
                "tablet:min-w-[210px] tablet:text-end",
                "mobile:min-w-0 mobile:w-full mobile:justify-start mobile:text-[12px] mobile:mt-0"
              )}
            >
              <p>{feedbackInfoData?.nickname}</p>
              <p>IP {feedbackInfoData?.clientIp}</p>
            </div>
          </div>
        </div>
        <hr />
        {(feedbackInfoData?.imgUrl || youtubeEmbedUrl) && (
          <div className="w-full flex flex-col gap-3 aspect-video">
            {feedbackInfoData?.imgUrl && !youtubeEmbedUrl && (
              <Image
                src={feedbackInfoData?.imgUrl}
                alt="Feedback img"
                width={672}
                height={128}
                className="mobile:w-full mobile:h-auto"
              />
            )}
            {youtubeEmbedUrl && (
              <iframe
                width="100%"
                height="408"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mobile:h-full"
              />
            )}
            {!youtubeEmbedUrl && feedbackInfoData?.data?.link && (
              <div className="w-[679px] min-h-[42px] mobile:w-full">
                <div>{feedbackInfoData?.data?.link}</div>
              </div>
            )}
          </div>
        )}
        <div
          className="text-[16px] leading-6 tracking-[-0.02em] text-gray7 mobile:text-[14px]"
          dangerouslySetInnerHTML={{ __html: feedbackInfoData?.content }}
        />
        <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
          <RecommendButton
            handleCommend={handleFeedbackCommend}
            recommendCount={feedbackInfoData?.recommendCount}
            isRecommend={feedbackInfoData?.isRecommended}
          />
        </div>
        <div className={cn("mobile:hidden")}>
          <PostAction type="community" reportData={reportData} />
        </div>
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
          isOpen={state.isSignInModalOpen}
          onClose={() => state.setIsSignInModalOpen(false)}
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
