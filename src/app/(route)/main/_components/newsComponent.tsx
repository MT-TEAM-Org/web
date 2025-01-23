import React from "react";
import NewsItem from "./newsItem";

const NewsComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <NewsItem />
      <NewsItem />
      <NewsItem />
    </div>
  );
};

export default NewsComponent;