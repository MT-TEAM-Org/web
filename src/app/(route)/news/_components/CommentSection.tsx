"use client";

import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React, { useRef } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import EmptyNewsComment from "./EmptyNewsComment";
import { useQueryClient } from "@tanstack/react-query";
import {
  NewsCommentList,
  NewsCommentResponse,
} from "@/app/(route)/news/_types/newsCommentType";
import { NewsInfoDataType } from "@/app/(route)/news/_types/newsInfoType";
import NewsCommentItem from "../[newsCategoryType]/news-detail/[id]/_components/NewsCommentItem";
import { usePathname } from "next/navigation";

type NewsCommentDataType = NewsCommentResponse | NewsCommentList;

interface CommentSectionProps {
  newsInfoData?: NewsInfoDataType;
  newsCommentData?: NewsCommentDataType;
  newsBestCommentData?: NewsCommentDataType;
}

const CommentSection = ({
  newsInfoData,
  newsCommentData,
  newsBestCommentData,
}: CommentSectionProps) => {
  const commentBarRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const onHandleToTop = () => {
    if (commentBarRef.current) {
      const navBarHeight = 130;
      const y =
        commentBarRef.current.getBoundingClientRect().top +
        window.scrollY -
        navBarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const RefreshButton = () => {
    queryClient.invalidateQueries({
      queryKey: ["getNewsComment", newsInfoData?.id],
    });
    queryClient.refetchQueries({
      queryKey: ["getNewsComment", newsInfoData?.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["getBestComment", newsInfoData?.id],
    });
    queryClient.refetchQueries({
      queryKey: ["getBestComment", newsInfoData?.id],
    });
  };

  const bestComments: NewsCommentList = Array.isArray(newsBestCommentData)
    ? newsBestCommentData
    : newsBestCommentData?.list || [];
  const bestCommentIds = bestComments.map((item) => item.newsCommentId);

  const commentsList: NewsCommentList = Array.isArray(newsCommentData)
    ? newsCommentData
    : newsCommentData?.list || [];
  const filteredComments = commentsList.filter(
    (commentItem) => !bestCommentIds.includes(commentItem.newsCommentId)
  );

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} onRefresh={RefreshButton} />

        <div className="w-full h-auto">
          {bestComments.length > 0 &&
            bestComments.map((bestCommentItem) => (
              <NewsCommentItem
                data={bestCommentItem}
                bestComment={true}
                key={`best-${bestCommentItem.newsCommentId}`}
              />
            ))}
        </div>

        <div className="max-w-full h-auto">
          {filteredComments.length === 0 && bestComments.length === 0 ? (
            <EmptyNewsComment />
          ) : (
            filteredComments.map((commentItem) => (
              <NewsCommentItem
                data={commentItem}
                bestComment={false}
                key={`${commentItem.newsCommentId}`}
              />
            ))
          )}
        </div>
      </div>
      <PostNavigation
        currentPath={pathname}
        scrollToCommentBar={onHandleToTop}
        nextId={newsInfoData?.nextId}
        previousId={newsInfoData?.previousId}
      />
    </>
  );
};

export default CommentSection;
