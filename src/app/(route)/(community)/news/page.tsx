"use client";

import React from "react";
import { NewsTalkToolbar } from "../_components/NewsTalkToolbar";
import EmptyNews from "./_components/EmptyNews";
import useFetchNewsData from "./fetchNewsData";
import NewsPostItem from "./_components/NewsPostItem";

interface newsItem {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
}

const Page = () => {
  const { data, isLoading, error } = useFetchNewsData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading news</p>;

  console.log("NewsListData: ", data);

  return (
    <div className="flex flex-col justify-center bg-[#FAFAFA] rounded-tl-[5px] rounded-tr-[5px]">
      <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] border-b bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar />
      </div>
      <div>
        {data.length === 0 ? (
          <EmptyNews />
        ) : (
          data.map((newsItem: newsItem) => (
            <NewsPostItem key={newsItem.id} newsItem={newsItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
