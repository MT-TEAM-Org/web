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

  // newsBestCommentData의 newsCommentId 배열 추출
  const bestCommentIds =
    newsBestCommentData?.list?.content?.map(
      (item: CommentContent) => item.newsCommentId
    ) || [];

  // newsCommentData에서 bestCommentIds와 겹치지 않는 댓글만 필터링
  const filteredComments = (
    newsCommentData?.list?.content ||
    newsCommentData?.content ||
    []
  ).filter(
    (commentItem: CommentContent) =>
      !bestCommentIds.includes(commentItem.newsCommentId)
  );

  console.log("newsBestCommentData: ", newsBestCommentData);
  console.log("newsCommentData: ", newsCommentData);
  console.log("filteredComments: ", filteredComments);

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} onRefresh={handleRefresh} />
        <div className="w-full h-auto">
          {newsBestCommentData?.length === 0
            ? null
            : newsBestCommentData?.map((bestCommentItem: CommentContent) => (
                <NewsCommentItem
                  data={bestCommentItem}
                  bestComment={true}
                  key={bestCommentItem.newsCommentId}
                />
              ))}
        </div>

        <div className="max-w-full h-auto">
          {!newsCommentData ||
          (!newsCommentData.list?.content && !newsCommentData.content) ||
          filteredComments.length === 0 ? (
            <EmptyNewsComment />
          ) : (
            filteredComments.map((commentItem: CommentContent) => (
              <NewsCommentItem
                data={commentItem}
                key={commentItem.newsCommentId}
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
