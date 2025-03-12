"use client";

import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React, { useRef } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import EmptyNewsComment from "./EmptyNewsComment";
import { CommentContent } from "@/app/_constants/newsCommentType";
import { useQueryClient } from "@tanstack/react-query";
import NewsCommentItem from "../[subcategory]/news-detail/[id]/_components/NewsCommentItem";

const CommentSection = ({ newsInfoData, newsCommentData }) => {
  const commentBarRef = useRef(null);
  const queryClient = useQueryClient();
  const id = newsInfoData?.id;

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

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} onRefresh={handleRefresh} />

        <div className="max-w-full h-auto">
          {!newsCommentData ||
          (!newsCommentData.list?.content && !newsCommentData.content) ||
          newsCommentData.list?.content?.length === 0 ||
          newsCommentData.content?.length === 0 ? (
            <EmptyNewsComment />
          ) : (
            (
              newsCommentData.list?.content ||
              newsCommentData.content ||
              []
            ).map((commentItem: CommentContent) => (
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
