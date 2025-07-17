import React from "react";
import StatusBannerItem from "./StatusBannerItem";

const StatusBanner = () => {
  return (
    <div className="w-full h-[142px] bg-gray1 rounded-[10px] flex items-center justify-center gap-4">
      <StatusBannerItem
        meta={{
          title: "가입자수",
          count: 8,
          totalCount: 165,
          percentage: 8.5,
        }}
        icon={{
          mainIcon: "USER_JOIN_COUNT",
          statusIcon: false,
        }}
      />
      <StatusBannerItem
        meta={{
          title: "탈퇴자수",
          count: 8,
          totalCount: 165,
          percentage: 15,
        }}
        icon={{
          mainIcon: "USER_JOIN_COUNT",
          statusIcon: false,
        }}
      />
      <StatusBannerItem
        meta={{
          title: "탈퇴자수",
          count: 8,
          totalCount: 165,
          percentage: 15,
        }}
        icon={{
          mainIcon: "USER_JOIN_COUNT",
          statusIcon: false,
        }}
      />
      <StatusBannerItem
        meta={{
          title: "경고",
          count: 8,
          totalCount: 165,
          percentage: 12.5,
        }}
        icon={{
          mainIcon: "USER_JOIN_COUNT",
          statusIcon: true,
        }}
      />
      <StatusBannerItem
        meta={{
          title: "정지",
          count: 8,
          totalCount: 65,
          percentage: 12.5,
        }}
        icon={{
          mainIcon: "USER_JOIN_COUNT",
          statusIcon: false,
        }}
      />
    </div>
  );
};

export default StatusBanner;
