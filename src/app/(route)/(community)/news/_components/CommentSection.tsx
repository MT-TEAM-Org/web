"use client";

import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React, { useRef } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import EmptyNewsComment from "./EmptyNewsComment";
import { CommentContent } from "@/app/_constants/newsCommentType";
import { useQueryClient } from "@tanstack/react-query";
import NewsCommentItem from "../[subcategory]/news-detail/[id]/_components/NewsCommentItem";

interface CommentSectionProps {
  newsInfoData?: any;
  newsCommentData?: any;
  newsBestCommentData?: any;
}

const CommentSection = ({
  newsInfoData,
  newsCommentData,
  newsBestCommentData,
}: CommentSectionProps) => {
  const commentBarRef = useRef(null);
  const queryClient = useQueryClient();

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

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["getNewsComment", newsInfoData?.id],
    });
    queryClient.refetchQueries({
      queryKey: ["getNewsComment", newsInfoData?.id],
    });
  };

  const bestComments =
    newsBestCommentData?.list?.content || newsBestCommentData || [];
  const bestCommentIds = bestComments.map(
    (item: CommentContent) => item.newsCommentId
  );

  const commentsList =
    newsCommentData?.list?.content || newsCommentData?.content || [];
  const filteredComments = commentsList.filter(
    (commentItem: CommentContent) =>
      !bestCommentIds.includes(commentItem.newsCommentId)
  );

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} onRefresh={handleRefresh} />

        <div className="w-full h-auto">
          {bestComments.length > 0 &&
            bestComments.map((bestCommentItem: CommentContent) => (
              <NewsCommentItem
                data={bestCommentItem}
                bestComment={true}
                key={`best-${bestCommentItem.newsCommentId}`}
              />
            ))}
        </div>

        <div className="max-w-full h-auto">
          {filteredComments.length && bestComments.length === 0 ? (
            <EmptyNewsComment />
          ) : (
            filteredComments.map((commentItem: CommentContent) => (
              <NewsCommentItem
                data={commentItem}
                bestComment={false}
                key={`${commentItem.newsCommentId}`}
              />
            ))
          )}
        </div>
      </div>
      <PostNavigation scrollToCommentBar={onHandleToTop} />
    </>
  );
};

export default CommentSection;
