"use client";

import React, { useRef, useState } from "react";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import { NewsInfoDataType } from "@/app/(route)/news/_types/newsInfoType";
import { usePathname } from "next/navigation";
import BoardComment from "../../(community)/_components/BoardComment";
import { CommentItem } from "@/_types/comment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";

interface CommentSectionProps {
  newsInfoData?: NewsInfoDataType;
}

const CommentSection = ({ newsInfoData }: CommentSectionProps) => {
  const commentBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const comments = useRef(null);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

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

  return (
    <>
      <BoardComment
        id={newsInfoData?.id.toString()}
        ref={comments}
        setParentsComment={setParentsComment}
        type="NEWS"
      />
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
