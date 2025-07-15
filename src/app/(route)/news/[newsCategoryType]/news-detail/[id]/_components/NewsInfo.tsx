"use client";

import useDeleteRecommend from "@/_hooks/fetcher/news/useDeleteRecommend";
import useGetNewsInfoData from "@/_hooks/fetcher/news/useGetNewInfo";
import usePatchRecommend from "@/_hooks/fetcher/news/usePatchRecommend";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import NewsInfoSkeleton from "./NewsInfoSkeleton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import { cn } from "@/utils";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { CommentItem } from "@/_types/comment";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import NewsDetailGnb from "@/app/(route)/news/_components/newsGnb/NewsDetailGnb";
import NewsDetailContent from "./NewsDetailContent";
import NewsRecommend from "./NewsRecommend";
import { onHandleToTop } from "@/app/(route)/news/_utils/onHandleToTop";

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

const NewsInfo = ({
  params,
}: {
  params: Promise<{ newsCategoryType: string; id: string }>;
}) => {
  const { id, newsCategoryType } = use(params);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const adminRole = useAdminRole();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const newsDetailType = pathname.split("/")[2];
  const comments = useRef(null);
  const commentBarRef = useRef<HTMLDivElement>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  useEffect(() => {
    const validTypes = ["esports", "football", "baseball"];
    if (!validTypes.includes(newsDetailType)) {
      router.push("/404");
    }
  }, [newsDetailType, router]);

  const { data: newsInfoData, isLoading } = useGetNewsInfoData(id, token);
  const { mutate: newsAddRecommend } = usePatchRecommend();
  const { mutate: newsDeleteRecommend } = useDeleteRecommend();

  const changedCategory = (category: string): NewsCategoryType | undefined => {
    const categoryMap: Record<string, NewsCategoryType> = {
      esports: "ESPORTS",
      football: "FOOTBALL",
      baseball: "BASEBALL",
    };
    return categoryMap[category?.toLowerCase()] || "";
  };

  const category = changedCategory(newsCategoryType);

  const handleNewsCommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = newsInfoData?.recommend;
    const newsAction = isRecommended ? newsDeleteRecommend : newsAddRecommend;

    newsAction(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getNewsInfo", id] });
      },
    });
  };

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
        category={category}
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
