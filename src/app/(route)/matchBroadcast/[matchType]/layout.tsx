import React, { use } from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import { cn } from "@/utils";

export const metadata = {
  title: "경기 중계",
  description: "경기 중계 페이지입니다.",
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ matchType: string }>;
}) {
  const unwrappedParams = use(params);
  const { matchType } = unwrappedParams;

  return (
    <div className="w-full h-full">
      <div className="w-full h-[226px] flex justify-center items-center mx-auto bg-gray1">
        <div
          className={cn("max-w-full", "tablet:max-w-full", "mobile:h-[158px]")}
        >
          <ScheduleContainer
            matchType={matchType}
            showCategoryButtons={true}
            showAll={false}
          />
        </div>
      </div>
      <div
        className={cn(
          "my-[24px]",
          "mobile:my-0",
          "pc:min-h-[500px]",
          "tablet:min-h-[550px]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
