"use client";

import useDeleteRecommend from "@/_hooks/fetcher/news/useDeleteRecommend";
import useGetNewsInfoData from "@/_hooks/fetcher/news/useGetNewInfo";
import usePatchRecommend from "@/_hooks/fetcher/news/usePatchRecommend";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import { newsListConfig } from "@/app/(route)/news/_types/newsListConfig";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import useTimeAgo from "@/utils/useTimeAgo";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import NewsInfoSkeleton from "./NewsInfoSkeleton";
import ChangedCategory from "@/app/(route)/news/_utils/changedCategory";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import Image from "next/image";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import CommentSection from "@/app/(route)/news/_components/CommentSection";
import NewsTalkToolbar from "@/app/(route)/news/_components/NewsTalkToolbar";
import NewsPostItemSkeleton from "@/app/(route)/news/_components/NewsPostItemSkeleton";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import NewsPostItem from "@/app/(route)/news/_components/NewsPostItem";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import EmptyItem from "@/app/(route)/customer/_components/EmptyItem";
import { cn } from "@/utils";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    const validTypes = ["esports", "football", "baseball"];
    if (!validTypes.includes(newsDetailType)) {
      router.push("/404");
    }
  }, [newsDetailType, router]);

  const { data: newsInfoData, isLoading } = useGetNewsInfoData(id, token);
  const formattedTime = useTimeAgo(newsInfoData?.postDate);
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
  const orderType = () => {
    if (searchParams.get("order_type") === "RECOMMEND") {
      return "DATE";
    } else if (searchParams.get("order_type") === "CREATE") {
      return "VIEW";
    } else {
      return "COMMENT";
    }
  };

  const newsOption: newsListConfig = {
    page: Number(searchParams.get("page")) || 1,
    size: 20,
    category: (category as NewsCategoryType) || "",
    orderType: orderType() as newsListConfig["orderType"],
    searchType:
      (searchParams.get("search_type") as newsListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
    timePeriod:
      (searchParams.get("time") as newsListConfig["timePeriod"]) || "DAILY",
  };

  const { data: newsListData } = useSortedNewsDataList(newsOption);
  const updatedImgUrl = updateImageUrl(newsInfoData?.thumbImg, "w360");

  const sliceNewsListData = newsListData
    ? newsListData?.content?.slice(0, 10)
    : [];

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > newsListData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <>
      {isLoading ? (
        <NewsInfoSkeleton />
      ) : (
        <div
          className={cn(
            "w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md",
            "tablet:max-w-[687px]",
            "mobile:max-w-full mobile:w-full mobile:p-4 mobile:gap-3"
          )}
        >
          <div className="w-full h-auto flex flex-col gap-2">
            <h1
              className={cn(
                "w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8",
                "tablet:text-[18px] tablet:leading-7 tablet:tracking-[-0.72px] tablet:font-bold",
                "mobile:text-[16px] mobile:leading-6 mobile:tracking-[-0.02em]"
              )}
            >
              {newsInfoData?.title}
            </h1>

            <div
              className={cn(
                "w-full h-auto min-h-[20px] gap-4 flex justify-between text-gray2",
                "mobile:flex-wrap mobile:h-[40px] mobile:gap-1"
              )}
            >
              <div className="flex gap-2 text-gray6 font-[700] leading-5 text-[14px] items-center">
                <div
                  className={cn(
                    "flex gap-1 font-medium text-[14px] leading-5",
                    "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
                  )}
                >
                  <ChangedCategory category={newsInfoData?.category} />
                  <p>{formattedTime}</p>
                </div>
                <div
                  className={cn(
                    "flex gap-1 font-medium text-[14px] leading-5",
                    "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
                  )}
                >
                  <p className="font-bold">조회수 {newsInfoData?.viewCount}</p>
                  <p className="font-bold">댓글 {newsInfoData?.commentCount}</p>
                  <p className="font-bold">
                    추천 {newsInfoData?.recommendCount}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "text-[14px] flex justify-end font-[500] leading-5 gap-1 text-gray6",
                  "tablet:min-w-[210px]",
                  "mobile:text-[12px] mobile:h-[18px] mobile:tracking-[-0.02em] mobile:w-full mobile:justify-start"
                )}
              >
                <p>네이버 스포츠</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full h-auto flex flex-col items-center justify-start gap-3">
            {newsInfoData?.thumbImg && (
              <Image
                src={newsInfoData ? updatedImgUrl : "/Empty_news.png"}
                alt="News detail img"
                width={672}
                height={338}
                className="object-cover mobile:h-auto"
              />
            )}
            <p
              className={cn(
                "font-[500] text-[16px] leading-6 tracking-[-0.02em] text-gray7 overflow-hidden line-clamp-2",
                "mobile:text-[14px] mobile:leading-5"
              )}
            >
              {newsInfoData?.content}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <RecommendButton
              handleCommend={handleNewsCommend}
              recommendCount={newsInfoData?.recommendCount}
              isRecommend={newsInfoData?.recommend}
            />
          </div>

          <div className={cn("mobile:hidden")}>
            <PostAction type="news" source={newsInfoData?.source} />
          </div>
          <CommentSection newsInfoData={newsInfoData} />
        </div>
      )}

      <div
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] overflow-hidden",
          "tablet:max-w-[687px]",
          "mobile:w-full mobile:max-w-full mobile:min-h-[56px]"
        )}
      >
        <NewsTalkToolbar
          newsType={category}
          pageInfo={newsListData?.pageInfo}
        />
      </div>

      <div
        className={cn(
          "w-full h-auto rounded-[5px] shadow-md bg-white",
          "mobile:max-w-full"
        )}
      >
        <div
          className={cn(
            "w-[720px] h-auto rounded-b-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
            "tablet:max-w-[687px]",
            "mobile:w-full mobile:max-w-full"
          )}
        >
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : sliceNewsListData?.length === 0 ? (
            <EmptyItem title="뉴스가" />
          ) : (
            sliceNewsListData?.map((newsItem: NewsListType) => (
              <NewsPostItem
                key={newsItem?.id}
                newsItem={newsItem}
                searchType={searchParams.get("search_type")}
                searchString={searchParams.get("search")}
              />
            ))
          )}
          {newsListData?.pagInfo.totalPage > 0 && (
            <div
              className={cn(
                "hidden",
                "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
              )}
            >
              <Pagination
                pageInfo={newsListData?.pageInfo}
                onPageChangeAction={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default NewsInfo;
