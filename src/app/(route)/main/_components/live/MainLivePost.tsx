import React, { useState } from "react";
import HotPost from "./hotPost";
import { cn } from "@/utils";
import NewPost from "./NewPost";

const style = {
  divBaseStyle:
    "w-full h-[40px] rounded-t-[5px] text-[14px] leading-5 flex items-center justify-center cursor-pointer",
  divActiveStyle: "border-x border-t border-gray8 bg-white",
  divDisabledStyle: "border-b border-gray5 bg-white text-gray5",
};

const MainLivePost = () => {
  const [activeTab, setActiveTab] = useState("hot");

  const tabs = [
    {
      id: "hot",
      label: "실시간 HOT 게시글",
      component: <HotPost />,
    },
    {
      id: "new",
      label: "실시간 최신 게시글",
      component: <NewPost />,
    },
  ];

  return (
    <>
      <div
        className={cn(
          "w-full min-h-[392px] flex flex-col gap-6",
          "tablet:w-full",
          "mobile:w-full mobile:max-w-[calc(100vw-32px)] mobile:mx-auto mobile:min-h-fit mobile:mb-8",
          "pc:hidden"
        )}>
        <div className="w-full flex">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                style.divBaseStyle,
                activeTab === tab.id
                  ? style.divActiveStyle
                  : style.divDisabledStyle
              )}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </div>
          ))}
        </div>
        <div>{tabs.find((tab) => tab.id === activeTab)?.component}</div>
      </div>
      <div className={cn("w-[862px] hidden", "pc:flex pc:gap-6")}>
        <HotPost />
        <NewPost />
      </div>
    </>
  );
};

export default MainLivePost;
