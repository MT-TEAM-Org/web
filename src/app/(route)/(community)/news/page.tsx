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

  const newsList = data?.data?.list?.content || [];
  console.log(data.data.list.content);
  console.log(newsList);

  return (
    <div className="flex flex-col justify-center bg-[#FAFAFA] mt-3.5">
      <div className="w-full min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar />
      </div>
      <div>
        {newsList.length === 0 ? (
          <EmptyNews />
        ) : (
          newsList.map((newsItem: newsItem) => (
            <NewsPostItem key={newsItem.id} newsItem={newsItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
