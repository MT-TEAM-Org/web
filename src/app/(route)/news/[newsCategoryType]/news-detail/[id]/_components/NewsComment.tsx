import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import React, { useRef, useState } from "react";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { onHandleToTop } from "@/app/(route)/news/_utils/onHandleToTop";
import { usePathname } from "next/navigation";
import { CommentItem } from "@/_types/comment";

interface NewsCommentProps {
  newsInfoData: NewsListType;
  setParentsComment: (comment: CommentItem | null) => void;
  commentRefs: {
    comments: React.RefObject<HTMLDivElement>;
    commentBarRef: React.RefObject<HTMLDivElement>;
  };
}

const NewsComment = ({
  newsInfoData,
  setParentsComment,
  commentRefs,
}: NewsCommentProps) => {
  const { comments, commentBarRef } = commentRefs;
  const pathname = usePathname();

  return (
    <section className="flex flex-col bg-white px-6 gap-4">
      <BoardComment
        id={newsInfoData?.id.toString()}
        ref={comments}
        setParentsComment={setParentsComment}
        type="NEWS"
      />
      <PostNavigation
        currentPath={pathname}
        scrollToCommentBar={() => onHandleToTop(commentBarRef)}
        nextId={newsInfoData?.nextId}
        previousId={newsInfoData?.previousId}
      />
    </section>
  );
};

export default NewsComment;
