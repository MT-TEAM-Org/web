import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";

interface EventItemProps {
  gameEventData: any;
  customClass?: string;
}

const EventItem = ({ gameEventData, customClass }: EventItemProps) => {
  return (
    <Link href={gameEventData?.link} target="_blank">
      <div
        className={cn(
          "w-full min-w-[298px] h-[92px] flex items-center p-3 gap-3",
          customClass,
          "tablet:min-w-full",
          "mobile:min-w-full mobile:mx-auto"
        )}
      >
        <div className="w-[68px] h-[68px] rounded-[5px] relative bg-gray1 overflow-hidden flex-shrink-0">
          {gameEventData ? (
            <Image
              src={gameEventData.thumbImg}
              alt={gameEventData.title || "game event"}
              width={68}
              height={68}
              className="max-w-[68px] h-[68px] object-cover"
            />
          ) : (
            <CustomIcon
              icon="MAIN_DEFAULT_THUMBNAIL_ICON"
              className="max-w-[68px] h-[68px] object-cover"
            />
          )}
        </div>
        <div className="flex flex-col min-h-[58px] gap-[6px] flex-1 mobile:min-w-0">
          <div className="flex flex-col justify-between">
            <p className="w-full h-[24px] text-[16px] font-[700] leading-[24px] text-gray9 tracking-[-0.02em] align-middle text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.title}
            </p>
            <p className="w-full h-[20px] text-[14px] font-[500] leading-[20px] tracking-[0%] align-middle text-gray7 text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.description}
            </p>
          </div>
          <p className="w-full h-[18px] text-[12px] font-[500] leading-[18px] text-gray5 tracking-[-0.02em] align-middle">
            {gameEventData?.period}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
