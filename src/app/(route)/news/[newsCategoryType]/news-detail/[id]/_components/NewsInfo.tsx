"use client";

import useGetNewsInfoData from "@/_hooks/fetcher/news/useGetNewInfo";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import NewsInfoSkeleton from "./NewsInfoSkeleton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import { cn } from "@/utils";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { CommentItem } from "@/_types/comment";
import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import NewsDetailContent from "./NewsDetailContent";
import NewsRecommend from "./NewsRecommend";
import NewsComment from "./NewsComment";
import useNewsRecommend from "@/app/(route)/news/_hooks/useNewsRecommend";

const NewsInfo = ({
  params,
}: {
  params: Promise<{ newsCategoryType: string; id: string }>;
}) => {
  const { id, newsCategoryType } = use(params);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const newsDetailType = pathname.split("/")[2];
  const comments = useRef(null);
  const commentBarRef = useRef<HTMLDivElement>(null);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  // 뉴스 타입 체크
  useEffect(() => {
    const validTypes = ["esports", "football", "baseball"];
    if (!validTypes.includes(newsDetailType)) {
      router.push("/404");
    }
  }, [newsDetailType, router]);

  const { data: newsInfoData, isLoading } = useGetNewsInfoData(id);

  // commentId 쿼리 파라미터가 있을 경우, 해당 댓글 DOM으로 스크롤
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

  // 게시글 추천
  const { handleNewsCommend, isSignInModalOpen, setIsSignInModalOpen } =
    useNewsRecommend({
      id,
      newsInfoData,
      queryClient,
    });

  return (
    <>
      {isLoading && <NewsInfoSkeleton />}
      {!isLoading && (
        <>
          {/* 모바일 GNB */}
          <div className={cn("pc:hidden tablet:hidden")}>
            <NewsDetailGnb title={newsInfoData?.title} />
          </div>
          {/* 뉴스 본문 */}
          <NewsDetailContent
            newsInfoData={newsInfoData}
            handleNewsCommend={handleNewsCommend}
          />
          {/* 댓글 */}
          <NewsComment
            newsInfoData={newsInfoData}
            setParentsComment={setParentsComment}
            commentRefs={{ comments, commentBarRef }}
          />
        </>
      )}

      {/* 댓글 입력창 */}
      <div className="shadow-sm sticky bottom-0">
        <SendCommentBox
          id={newsInfoData?.id.toString()}
          parentsComment={parentsComment}
          setParentsComment={setParentsComment}
          type="NEWS"
        />
      </div>

      {/* 추천 뉴스 */}
      <NewsRecommend
        isLoading={isLoading}
        newsCategoryType={newsCategoryType}
        searchParams={searchParams}
      />

      {/* 로그인 모달 */}
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default NewsInfo;
