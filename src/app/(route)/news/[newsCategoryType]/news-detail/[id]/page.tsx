"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import useTimeAgo from "@/utils/useTimeAgo";
import ChangedCategory from "@/app/(route)/news/_utils/changedCategory";
import CommentSection from "../../../_components/CommentSection";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import EmptyNews from "../../../_components/EmptyNews";
import NewsPostItem from "../../../_components/NewsPostItem";
import NewsTalkToolbar from "../../../_components/NewsTalkToolbar";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import NewsInfoSkeleton from "./_components/NewsInfoSkeleton";
import NewsPostItemSkeleton from "../../../_components/NewsPostItemSkeleton";
import useGetNewsInfoData from "@/_hooks/fetcher/news/useGetNewInfo";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import usePatchRecommend from "@/_hooks/fetcher/news/usePatchRecommend";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteRecommend from "@/_hooks/fetcher/news/useDeleteRecommend";
import useGetNewsComment from "@/_hooks/fetcher/news/comment/useGetNewsComment";
import NewsSendCommentBox from "./_components/NewsSendCommentBox";
import useGetBestComment from "@/_hooks/fetcher/news/comment/useGetBestComment";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { newsListConfig } from "../../../_types/newsListConfig";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

const Page = ({
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

  useEffect(() => {
    const validTypes = ["esports", "football", "baseball"];
    if (!validTypes.includes(newsDetailType)) {
      router.push("/404");
    }
  }, [newsDetailType, router]);

  const { data: newsInfoData, isLoading } = useGetNewsInfoData(id);
  const { data: newsBestCommentData } = useGetBestComment(newsInfoData?.id);
  const { data: newsCommentData } = useGetNewsComment(id);
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

  return (
    <>
      {isLoading ? (
        <NewsInfoSkeleton />
      ) : (
        <div className="flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-white shadow-sm mb-2">
          <div className="w-full h-auto flex flex-col gap-2">
            <h1 className="w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8">
              {newsInfoData?.title}
            </h1>

            <div className="w-full h-auto min-h-[20px] gap-4 flex justify-between text-gray2">
              <div className="flex gap-2 text-gray6 font-[700] leading-5 text-[14px]">
                <div className="flex gap-1 font-medium text-[14px] leading-5">
                  <ChangedCategory category={newsInfoData?.category} />
                  <p>{formattedTime}</p>
                </div>
                <div className="flex gap-1 font-medium text-[14px] leading-5">
                  <p className="font-bold">조회수 {newsInfoData?.viewCount}</p>
                  <p>댓글 {newsInfoData?.commentCount}</p>
                </div>
                <div className="flex gap-1 font-medium text-[14px] leading-5">
                  <p className="font-bold">추천</p>
                  <p>{newsInfoData?.recommendCount}</p>
                </div>
              </div>
              <div className="text-[14px] flex font-[500] leading-5 gap-1 text-gray6">
                <p>네이버 스포츠</p>
              </div>
            </div>
          </div>
          <hr />
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
            <p className="font-[500] text-[16px] leading-6 tracking-[-0.02em] text-gray7 overflow-hidden line-clamp-2">
              {newsInfoData?.content}
            </p>
          </div>

          <RecommendButton
            handleCommend={handleNewsCommend}
            recommendCount={newsInfoData?.recommendCount}
            isRecommend={newsInfoData?.recommend}
          />

          <PostAction type="news" source={newsInfoData?.source} />
          <CommentSection
            newsInfoData={newsInfoData}
            newsCommentData={newsCommentData}
            newsBestCommentData={newsBestCommentData}
          />
        </div>
      )}

      <NewsTalkToolbar newsType={category} pageInfo={newsListData?.pageInfo} />

      <div className="w-[720px] h-auto rounded-b-[5px] overflow-hidden shadow-md">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <NewsPostItemSkeleton key={index} />)
        ) : sliceNewsListData?.length === 0 ? (
          <EmptyNews />
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
      <div className="shadow-md sticky bottom-0">
        <NewsSendCommentBox id={id} />
      </div>
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default Page;
