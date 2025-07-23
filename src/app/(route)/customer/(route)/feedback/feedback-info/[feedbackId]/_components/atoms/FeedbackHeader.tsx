import React from "react";
import { InfoItems } from "../../_constants/InfoItems";
import { cn } from "@/utils";
import FeedbackStatusBadge from "../FeedbackStatusBadgeProps";
import StatusSaver from "../StatusSaver";
import useTimeAgo from "@/utils/useTimeAgo";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";

interface FeedbackHeaderProps {
  id: string | string[];
  adminRole: string;
  feedbackInfoData: FeedbackInfoType;
}

const FeedbackHeader = ({
  id,
  adminRole,
  feedbackInfoData,
}: FeedbackHeaderProps) => {
  const timeAgo = useTimeAgo(feedbackInfoData?.createdAt);

  return (
    <>
      {adminRole === "ADMIN" && (
        <StatusSaver id={id} status={feedbackInfoData?.status} />
      )}
      <div
        className={cn(
          "w-full flex gap-2 flex-col",
          adminRole !== "ADMIN" || adminRole === undefined
            ? "min-h-[56px]"
            : "",
          "mobile:gap-1"
        )}
      >
        {(adminRole !== "ADMIN" || adminRole === undefined) && (
          <FeedbackStatusBadge status={feedbackInfoData?.status} />
        )}
        <h1
          className={cn(
            "font-bold text-[18px] leading-7 tracking-[-0.72px]",
            "mobile:text-[16px] mobile:leading-6"
          )}
        >
          {feedbackInfoData?.title}
        </h1>
        <div
          className={cn(
            "w-full max-h-[20px] flex gap-4",
            "tablet:justify-between",
            "mobile:flex-wrap mobile:max-h-fit mobile:gap-1"
          )}
        >
          <div
            className={cn(
              "min-w-[421px] min-h-[20px] flex gap-2 text-[14px] leading-5 text-gray6",
              "mobile:min-w-0 mobile:flex-wrap mobile:text-[12px]"
            )}
          >
            <p className="font-bold">고객센터</p>
            <p>개선요청</p>
            <p>{timeAgo}</p>
            {InfoItems(feedbackInfoData).map((item, index) => (
              <div key={index} className="flex gap-2">
                <p className="font-bold">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "min-w-[235px] min-h-[20px] flex justify-end gap-1 text-[14px] leading-5 text-gray6",
              "tablet:min-w-[210px] tablet:text-end",
              "mobile:min-w-0 mobile:w-full mobile:justify-start mobile:text-[12px] mobile:mt-0"
            )}
          >
            <p>{feedbackInfoData?.nickname}</p>
            <p>IP {feedbackInfoData?.clientIp}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackHeader;
