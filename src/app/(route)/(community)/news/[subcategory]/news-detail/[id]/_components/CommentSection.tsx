"use client";

import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React, { useRef } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CommentItem from "@/app/(route)/(community)/_components/CommentItem";
import EmptyNewsComment from "../../../../_components/EmptyNewsComment";
import { CommentContent } from "@/app/_constants/newsCommentType";
import { useQueryClient } from "@tanstack/react-query";

const CommentSection = ({ newsInfoData, newsCommentData }) => {
  const commentBarRef = useRef(null);
  const queryClient = useQueryClient();

  // useRef 사용해서 댓글 제일 위로 버튼 구현
  const onHandleToTop = () => {
    if (commentBarRef.current) {
      const navBarHeight = 130; // 네비게이션 바 높이
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
              <CommentItem data={commentItem} key={commentItem.newsCommentId} />
            ))
          )}
        </div>
      </div>
      <PostNavigation scrollToCommentBar={onHandleToTop} />{" "}
    </>
  );
};

export default CommentSection;
