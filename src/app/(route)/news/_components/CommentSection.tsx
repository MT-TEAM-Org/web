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
}

const CommentSection = ({ newsInfoData }: CommentSectionProps) => {
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

  return (
    <>
      <div className="w-full h-auto" ref={commentBarRef}>
        <CommentBar data={newsInfoData} onRefresh={RefreshButton} />
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
