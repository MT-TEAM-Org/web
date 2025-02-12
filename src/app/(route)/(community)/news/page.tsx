import React from "react";
import { NewsTalkToolbar } from "../_components/NewsTalkToolbar";
import NewsPostItem from "./_components/NewsPostItem";
import EmptyNews from "./_components/EmptyNews";
import fetchNewsData from "./fetchNewsData";

const page = () => {
  return (
    <div className="flex flex-col justify-center bg-[#FAFAFA] mt-3.5">
      <div className="w-full min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar />
      </div>
      <div>
        {Array.from({ length: 15 }).map((_, index) => (
          <NewsPostItem key={index} />
        ))}
      </div>
    </div>
    // <div>
    //   <NewsTalkToolbar />
    //   <EmptyNews />
    // </div>
  );
};

export default page;
