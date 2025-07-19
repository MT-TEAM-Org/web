import React, { useState } from "react";
import NotificationTabs from "./NotificationTabs";
import NotificationItem from "./NotificationItem";
import { NotificationListData } from "../../../../MockData";

const NotificationList = () => {
  const [isActiveTab, setIsActiveTab] = useState<
    "report" | "inquiry" | "suggestion"
  >("report");

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full right-0 mt-2 z-50"
    >
      <div className="w-[424px] h-[600px] flex flex-col items-start justify-start rounded-[10px] border bg-white border-gray3 shadow-lg">
        {/* 제목 */}
        <h1 className="w-full h-[48px] px-4 py-2 flex items-center justify-start font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray8">
          알림 목록
        </h1>
        {/* 내부 리스트 */}
        <div className="w-full h-full px-3 pb-3 flex flex-col gap-4 overflow-hidden">
          {/* 탭 */}
          <NotificationTabs
            isActiveTab={isActiveTab}
            setIsActiveTab={setIsActiveTab}
          />
          {/* 리스트 영역 */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {NotificationListData[isActiveTab]?.map((item) => (
              <NotificationItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
