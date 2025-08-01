import React, { useState } from "react";
import { cn } from "@/utils";
import { LIVE_TABS } from "../../_constants/LIVE_TABS";

const style = {
  divBaseStyle:
    "w-full h-[40px] rounded-t-[5px] text-[14px] leading-5 flex items-center justify-center cursor-pointer",
  divActiveStyle: "border-x border-t border-gray8 bg-white",
  divDisabledStyle: "border-b border-gray5 bg-white text-gray5",
};

const MainLivePost = () => {
  const [activeTab, setActiveTab] = useState("hot");

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
          {LIVE_TABS.map((tab) => (
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
        <div>{LIVE_TABS.find((tab) => tab.id === activeTab)?.component}</div>
      </div>
      <div className={cn("w-[862px] hidden", "pc:flex pc:gap-6")}>
        {LIVE_TABS.map((tab, index) => (
          <div className="w-full" key={index}>
            {tab.component}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainLivePost;
