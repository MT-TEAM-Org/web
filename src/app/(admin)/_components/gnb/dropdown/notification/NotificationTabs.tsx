import { cn } from "@/utils";
import React from "react";

interface NotificationTabsProps {
  isActiveTab: "report" | "inquiry" | "suggestion";
  setIsActiveTab: (tab: "report" | "inquiry" | "suggestion") => void;
}

const style = {
  baseBtn:
    "w-1/3 h-full border-b-2 flex items-center justify-center font-bold text-[14px] leading-5 text-gray7 cursor-pointer transition-all duration-200",
  activeBtn: "border-gray7 text-gray7",
  inactiveBtn: "border-gray3 text-gray5",
};

const NotificationTabs = ({
  isActiveTab,
  setIsActiveTab,
}: NotificationTabsProps) => {
  const tabs = [
    {
      name: "신고",
      count: 3,
      type: "report",
      onClick: () => setIsActiveTab("report"),
    },
    {
      name: "문의",
      count: 12,
      type: "inquiry",
      onClick: () => setIsActiveTab("inquiry"),
    },
    {
      name: "개선요청",
      count: 3,
      type: "suggestion",
      onClick: () => setIsActiveTab("suggestion"),
    },
  ];

  return (
    <div className="w-full h-[48px] bg-white flex items-center justify-start">
      {tabs.map((item) => (
        <button
          key={item.name}
          onClick={item.onClick}
          className={cn(style.baseBtn, {
            [style.activeBtn]: isActiveTab === item.type,
            [style.inactiveBtn]: isActiveTab !== item.type,
          })}
        >
          {item.name} ({item.count})
        </button>
      ))}
    </div>
  );
};

export default NotificationTabs;
