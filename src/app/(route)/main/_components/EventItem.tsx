import React from "react";
import Image from "next/image";
import EventItemSkeleton from "./EventItemSkeleton";
import Link from "next/link";

interface EventItemProps {
  gameEventData: any;
  isLoading: boolean;
}

const EventItem = ({ gameEventData, isLoading }: EventItemProps) => {
  return isLoading ? (
    <EventItemSkeleton />
  ) : (
    <Link href={gameEventData?.link} target="_blank">
      <div className="w-[298px] min-h-[84px] flex items-center border border-gray2 rounded-[10px] p-3 gap-3 cursor-pointer">
        <Image
          src={gameEventData?.thumbImg || "/Fake_event_game.png"}
          alt={gameEventData?.title || "game event"}
          width={60}
          height={60}
          className="min-w-[60px] min-h-[60px] rounded-[3.75px]"
        />
        <div className="flex flex-col max-w-[202px] min-h-[58px] gap-2">
          <div className="flex flex-col">
            <p className="text-[14px] font-[700] leading-[20px] text-gray7 text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.title}
            </p>
            <p className="text-[12px] font-[500] leading-[18px] text-gray6 text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.description}
            </p>
          </div>
          <p className="text-[12px] font-[500] leading-[18px] text-gray5">
            {gameEventData?.period}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default EventItem;
