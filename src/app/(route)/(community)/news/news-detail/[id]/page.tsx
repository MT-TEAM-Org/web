"use client";

import React, { use } from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import NewsPostItem from "../../_components/NewsPostItem";
import SendCommentBox from "../../../_components/SendCommentBox";
import { NewsItemType } from "@/app/_constants/newsItemType";
import useSortedNewsDataList from "@/_hooks/useNews/useSortedPosts";
import NewsTalkToolbar from "../../_components/NewsTalkToolbar";
import useGetNewsInfoData from "@/_hooks/useNews/useGetNewsInfoData";
import useTimeAgo from "@/utils/useTimeAgo";
import PostAction from "../../../_components/PostAction";
import ChangedCategory from "@/utils/newsUtils/changedCategory";
import CommentSection from "./_components/CommentSection";
import { useNewsPageLogic } from "@/utils/newsUtils/useNewsPageLogic";
import EmptyNews from "../../_components/EmptyNews";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: newsInfoData } = useGetNewsInfoData(id);
  console.log("newsInfoData: ", newsInfoData);

  const {
    orderType,
    setOrderType,
    timeType,
    setTimeType,
    pageNum,
    onPageChange,
    searchType,
    setSearchType,
  } = useNewsPageLogic();
  const { data: newsListData } = useSortedNewsDataList({
    orderType,
    pageNum,
    timeType,
    searchType,
  });
  const sliceNewsListData = newsListData ? newsListData.slice(0, 3) : [];
  const updatedImgUrl = newsInfoData?.thumbImg?.replace(
    "type=w140",
    "type=w360"
  );

  return (
    <>
      <div className="flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-white shadow-sm mb-2">
        <div className="w-full h-auto flex flex-col gap-2">
          <h1 className="w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8">
            {newsInfoData?.title}
          </h1>

          <div className="w-full h-auto min-h-[20px] gap-4 flex justify-between text-gray2">
            <div className="flex gap-2 text-gray6 font-[700] leading-5 text-[14px]">
              <div className="flex gap-1 font-medium text-[14px] leading-5">
                <ChangedCategory category={newsInfoData?.category} />
                <p>{useTimeAgo(newsInfoData?.postDate)}</p>
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
          <Image
            src={newsInfoData?.thumbImg ? updatedImgUrl : "/Empty_news.png"}
            alt="News detail img"
            width={672}
            height={338}
          />
          <p className="font-[500] text-[16px] leading-6 tracking-[-0.02em] text-gray7 overflow-hidden line-clamp-2">
            {newsInfoData?.content}
          </p>
        </div>

        <div className="w-full h-auto flex justify-center gap-2">
          <button className="min-w-[120px] w-auto h-[40px] flex items-center text-[14px] justify-center gap-1 px-4 py-[13px] bg-[#00ADEE] text-white font-bold rounded-[5px]">
            <Single_logo />
            추천 12
          </button>
        </div>
        <PostAction type="news" source={newsInfoData?.source} />
        <CommentSection newsInfoData={newsInfoData} />
      </div>

      <NewsTalkToolbar
        setOrderType={setOrderType}
        setTimeType={setTimeType}
        onPageChange={onPageChange}
        setSearchType={setSearchType}
      />

      <div className="w-[720px] h-auto rounded-b-[5px] overflow-hidden shadow-md">
        {sliceNewsListData?.length === 0 ? (
          <EmptyNews />
        ) : (
          sliceNewsListData.map((newsInfoData: NewsItemType) => (
            <NewsPostItem newsItem={newsInfoData} key={newsInfoData.id} />
          ))
        )}
      </div>
      <div className="shadow-md">
        <SendCommentBox />
      </div>
    </>
  );
};

export default Page;
