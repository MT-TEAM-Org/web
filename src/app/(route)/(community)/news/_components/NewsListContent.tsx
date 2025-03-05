import React from "react";
import EmptyNews from "./EmptyNews";
import NewsPostItem from "./NewsPostItem";
import { NewsItemType } from "@/app/_constants/newsItemType";

interface NewsListContentProps {
  data: NewsItemType[];
  isLoading: boolean;
  isError: boolean;
}

const NewsListContent = ({
  data,
  isLoading,
  isError,
}: NewsListContentProps) => {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <>
      {data.length === 0 ? (
        <EmptyNews />
      ) : (
        data.map((newsItem) => (
          <NewsPostItem key={newsItem.id} newsItem={newsItem} />
        ))
      )}
    </>
  );
};

export default NewsListContent;
