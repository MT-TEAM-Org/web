import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomIcon from "@/app/_components/IconComponents/Icon";

interface EventItemProps {
  gameEventData: any;
}

const EventItem = ({ gameEventData }: EventItemProps) => {
  return (
    <Link href={gameEventData?.link} target="_blank">
      <div className="w-[298px] h-[92px] flex items-center border border-gray2 rounded-[5px] p-3 gap-3 cursor-pointer ">
        <div className="max-w-[68px] h-[68px] rounded-[5px] relative bg-gray1 overflow-hidden">
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
        <div className="flex flex-col max-w-[202px] min-h-[58px] gap-[6px]">
          <div className="flex flex-col justify-between">
            <p className="w-[194px] h-[24px] text-[16px] font-[700] leading-[24px] text-gray9 tracking-[-0.02em] align-middle text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.title}
            </p>
            <p className="w-[194px] h-[20px] text-[14px] font-[500] leading-[20px] tracking-[0%] align-middle text-gray7 text-ellipsis overflow-hidden whitespace-nowrap">
              {gameEventData?.description}
            </p>
          </div>
          <p className="w-[194px] h-[18px] text-[12px] font-[500] leading-[18px] text-gray5 tracking-[-0.02em] align-middle">
            {gameEventData?.period}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default EventItem;
