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
import React, { use, useEffect } from "react";
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

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

const NewsInfo = ({
  params,
}: {
  params: Promise<{ newsCategoryType: string; id: string }>;
}) => {
  const { id, newsCategoryType } = use(params);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
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
  const {
    mutate: newsAddCommend,
    isSignInModalOpen,
    setIsSignInModalOpen,
  } = usePatchRecommend();

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
    ? newsListData?.content?.slice(0, 3)
    : [];

  const handleNewsCommend = () => {
    if (!newsInfoData?.recommend) {
      newsAddCommend(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getNewsInfo", id] });
        },
      });
    } else if (newsInfoData?.recommend) {
      newsDeleteRecommend(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getNewsInfo", id] });
        },
      });
    }
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
      {isLoading ? (
        <NewsInfoSkeleton />
      ) : (
        <div
          className={cn(
            "flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-white shadow-sm mb-2",
            "mobile:w-[360px] mobile:gap-1"
          )}
        >
          <div className="w-full h-auto flex flex-col gap-2">
            <h1
              className={cn(
                "w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8",
                "mobile:text-[16px] mobile:tracking-[-0.02em] mobile:leading-4"
              )}
            >
              {newsInfoData?.title}
            </h1>

            <div
              className={cn(
                "w-full h-auto min-h-[20px] gap-4 flex justify-between text-gray2",
                "mobile:flex-col gap-1"
              )}
            >
              <div className="flex gap-2 text-gray6 font-[700] leading-5 text-[14px] items-center">
                <div
                  className={cn(
                    "flex gap-1 font-medium text-[14px] leading-5",
                    "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] mobile:font-bold"
                  )}
                >
                  <ChangedCategory category={newsInfoData?.category} />
                  <p>{formattedTime}</p>
                </div>
                <div
                  className={cn(
                    "flex gap-1 font-medium text-[14px] leading-5",
                    "mobile:text-[12px] leading-[18px] tracking-[-0.02em]"
                  )}
                >
                  <p className="font-bold">조회수 {newsInfoData?.viewCount}</p>
                  <p>댓글 {newsInfoData?.commentCount}</p>
                </div>
                <div
                  className={cn(
                    "flex gap-1 font-medium text-[14px] leading-5",
                    "mobile:text-[12px] leading-[18px] tracking-[-0.02em]"
                  )}
                >
                  <p className="font-bold">추천</p>
                  <p>{newsInfoData?.recommendCount}</p>
                </div>
              </div>
              <div
                className={cn(
                  "text-[14px] flex font-[500] leading-5 gap-1 text-gray6",
                  "mobile:text-[12px] leading-[18px] tracking-[-0.02em]"
                )}
              >
                <p>네이버 스포츠</p>
              </div>
            </div>
          </div>
          <hr className={cn("mobile:mb-2")} />
          <div className="w-full h-auto flex flex-col gap-3">
            {newsInfoData?.thumbImg && (
              <Image
                src={newsInfoData ? updatedImgUrl : "/Empty_news.png"}
                alt="News detail img"
                width={672}
                height={338}
                className="object-cover"
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

          <RecommendButton
            handleCommend={handleNewsCommend}
            recommendCount={newsInfoData?.recommendCount}
            isRecommend={newsInfoData?.recommend}
          />

          <div className={cn("mobile:hidden")}>
            <PostAction type="news" source={newsInfoData?.source} />
          </div>
          <CommentSection newsInfoData={newsInfoData} />
        </div>
      )}

      <div className={cn("mobile:hidden")}>
        <NewsTalkToolbar
          newsType={category}
          pageInfo={newsListData?.pageInfo}
        />
      </div>

      <div
        className={cn(
          "w-[720px] h-auto rounded-b-[5px] overflow-hidden shadow-md",
          "mobile:w-auto"
        )}
      >
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <NewsPostItemSkeleton key={index} />)
        ) : sliceNewsListData?.length === 0 ? (
          <EmptyItem title="뉴스가" />
        ) : (
          sliceNewsListData.map((newsItem: NewsListType) => (
            <NewsPostItem
              key={newsItem?.id}
              newsItem={newsItem}
              searchType={searchParams.get("search_type")}
              searchString={searchParams.get("search")}
            />
          ))
        )}
      </div>
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default NewsInfo;
