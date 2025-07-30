"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import { usePathname, useSearchParams } from "next/navigation";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import { useQueryClient } from "@tanstack/react-query";
import usePostNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/usePostNoticeRecommend";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import useDeleteNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteNoticeRecommend";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import { CommentItem } from "@/_types/comment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { cn } from "@/utils";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import { ReportType } from "@/services/board/types/report";

interface NoticeInfoItemProps {
  data: NoticeInfoItemType;
  id: number;
}

const NoticeInfoItem = ({ data, id }: NoticeInfoItemProps) => {
  const timeAgo = useTimeAgo(data?.createdAt);
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const comments = useRef(null);
  const adminRole = useAdminRole();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );
  const searchParams = useSearchParams();

  const { mutate: noticeAddRecommend } = usePostNoticeRecommend();
  const { mutate: noticeDeleteRecommend } = useDeleteNoticeRecommend();

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

  const handleFeedbackCommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = data?.isRecommended;
    const feedbackAction = isRecommended
      ? noticeDeleteRecommend
      : noticeAddRecommend;

    feedbackAction(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["noticeInfo", id] });
      },
    });
  };

  const noticeStats = [
    { label: "조회수", value: data?.viewCount },
    { label: "댓글", value: data?.commentCount },
    { label: "추천", value: data?.recommendCount },
  ];

  const link = data?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = link && getYouTubeEmbedUrl(link);

  return (
    <>
      <NewsDetailGnb title={data?.title} type="notice" />
      <div
        className={cn(
          "w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
          "tablet:w-full",
          "mobile:w-full mobile:px-4 mobile:py-3 mobile:gap-3"
        )}
      >
        <div
          className={cn(
            "w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col",
            "tablet:max-w-full",
            "mobile:max-w-full mobile:min-h-[68px] mobile:gap-1"
          )}
        >
          <h1
            className={cn(
              "font-bold text-[18px] leading-7 tracking-[-0.72px] text-black",
              "mobile:text-[16px] mobile:tracking-[-0.02em]"
            )}
          >
            {data?.title}
          </h1>
          <div
            className={cn(
              "min-h-[20px] flex gap-4 justify-between",
              "mobile:flex-col mobile:gap-1 mobile:min-h-[18px]"
            )}
          >
            <div
              className={cn(
                "min-h-[20px] flex gap-2",
                "mobile:gap-1 mobile:min-h-[18px]"
              )}
            >
              <div
                className={cn(
                  "min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6",
                  "mobile:min-h-[18px] mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
                )}
              >
                <p className="font-bold">고객센터</p>
                <p>공지사항</p>
                <p>{timeAgo}</p>
              </div>
              <div className="flex gap-2">
                {noticeStats.map((stat, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-1 text-[14px] leading-5 text-gray6",
                      "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
                    )}
                  >
                    <p className="font-bold">{stat.label}</p>
                    <p>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6 text-nowrap",
                "tablet:min-w-0 tablet:flex-shrink tablet:justify-end tablet:overflow-hidden",
                "mobile:min-h-[18px] mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
              )}
            >
              <p>{data?.nickname}</p>
              <p>{data?.clientIp}</p>
            </div>
          </div>
        </div>

        <hr />

        {(data?.imgUrl || youtubeEmbedUrl) && (
          <div className="w-full flex flex-col gap-3 aspect-video">
            {data?.imgUrl && !youtubeEmbedUrl && (
              <Image
                src={data?.imgUrl}
                alt="Feedback img"
                width={672}
                height={128}
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
            {!youtubeEmbedUrl && data?.link && (
              <div className="w-[679px] min-h-[42px]">
                <div>{data?.link}</div>
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            "w-full max-w-[672px] min-h-[48px] font-medium text-[16px] leading-6 tracking-[-0.02em] text-gray7",
            "mobile:min-h-auto"
          )}
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
        <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
          <RecommendButton
            handleCommend={handleFeedbackCommend}
            recommendCount={data?.recommendCount}
            isRecommend={data?.isRecommended}
          />
        </div>
        <BoardComment
          id={id.toString()}
          publicId={data?.publicId}
          ref={comments}
          setParentsComment={setParentsComment}
          type="NOTICE"
        />
        <PostNavigation
          nextId={data?.nextId}
          previousId={data?.previousId}
          currentPath={pathname}
        />
        <SignInModalPopUp
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
        />
      </div>
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

export default NoticeInfoItem;
