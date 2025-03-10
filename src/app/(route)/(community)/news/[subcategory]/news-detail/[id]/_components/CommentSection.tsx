"use client";

import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React, { useRef } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CommentItem from "@/app/(route)/(community)/_components/CommentItem";
import EmptyNewsComment from "../../../../_components/EmptyNewsComment";
import { NewsCommentData } from "@/app/_constants/newsCommentType";

const CommentSection = ({ newsInfoData, newsCommentData }) => {
  const commentBarRef = useRef(null);

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

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} />

        <div className="max-w-full h-auto">
          {newsCommentData?.content.length === 0 ? (
            <EmptyNewsComment />
          ) : (
            newsCommentData?.list?.content?.map(
              (newsCommentData: NewsCommentData, index) => (
                <CommentItem
                  data={newsCommentData}
                  key={newsCommentData?.list?.content[index].newsId}
                />
              )
            )
          )}
        </div>
      </div>
      <PostNavigation scrollToCommentBar={onHandleToTop} />{" "}
    </>
  );
};

export default CommentSection;
