import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";

export interface GameEventData {
  description: string;
  exposureDate: string;
  id: number;
  link: string;
  period: string;
  thumbImg: string;
  title: string;
}

interface EventItemProps {
  gameEventData: GameEventData;
}

const EventItem = ({ gameEventData }: EventItemProps) => {
  return (
    <Link
      href={gameEventData?.link}
      target="_blank"
      className="w-full h-[92px] flex items-center p-3 gap-3 border rounded-[5px] border-gray2 bg-white"
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
      <div className="w-full flex flex-col min-h-[58px] gap-[6px] flex-1 overflow-hidden">
        <div className="flex flex-col">
          <p className="text-[16px] font-[700] leading-[24px] text-gray9 tracking-[-0.02em] align-middle text-ellipsis overflow-hidden whitespace-nowrap">
            {gameEventData?.title}
          </p>
          <p className="text-[14px] font-[500] leading-[20px] tracking-[0%] align-middle text-gray7 text-ellipsis overflow-hidden whitespace-nowrap">
            {gameEventData?.description}
          </p>
        </div>
        <p className="text-[12px] font-[500] leading-[18px] text-gray5 tracking-[-0.02em] align-middle">
          {gameEventData?.period}
        </p>
      </div>
    </Link>
  );
};

export default EventItem;
