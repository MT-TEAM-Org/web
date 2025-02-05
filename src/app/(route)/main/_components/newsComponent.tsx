import React from "react";
import NewsItem from "./newsItem";

const NewsComponent = () => {
  return (
    <div className="w-[436px] min-h-[236px] flex flex-col gap-4">
      <NewsItem />
      <NewsItem />
      <NewsItem />
    </div>
  );
};

export default NewsComponent;