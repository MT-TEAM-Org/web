import React from "react";
import Image from "next/image";
import Single_logo_color from "@/app/_components/icon/Single_logo_color";
import { NewsCommentData } from "@/app/_constants/newsCommentType";

interface CommentItemProps {
  className?: string;
  bestComment?: boolean;
  replyComment?: boolean;
  data?: NewsCommentData;
}

const CommentItem = ({
  className = "",
  data,
  bestComment = false,
}: CommentItemProps) => {
  const bestCommentStyle =
    "max-w-full min-h-[132px] flex flex-col border-b border-gray1 gap-3 p-3";
  return (
    <div
      className={
        bestComment
          ? `${bestCommentStyle} bg-[#F8FDFF] ${className}`
          : `${bestCommentStyle} ${className}`
      }
    >
      {/* 목 데이터 */}
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/Fake_commentImg.png"
            alt="fake_img"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <p className="text-sm text-gray6 leading-5 font-medium">
            {data?.list?.content?.[0]?.memberDto?.nickName}{" "}
          </p>
          <p className="text-xs text-gray5 leading-4 font-medium">
            {data?.list?.content?.[0]?.createTime}{" "}
          </p>
          <p className="text-xs text-gray4 leading-[18px] font-medium">
            {data?.list?.content?.[0]?.ip}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray5 leading-[14px] font-medium cursor-pointer">
            신고
          </p>
        </div>
      </div>

      <div className="flex text-[14px] leading-5">
        {/* {data?.nestedComments ? (
          <>
            <p className="font-bold text-[#00ADEE]">{data.nestedComments}</p>
            <p className="font-medium text-gray7">&nbsp; 깔끔디자인 좋네요</p>
          </>
        ) : ( */}
        <p className="text-gray7 font-medium">
          {data?.list?.content?.[0]?.comment}
        </p>
        {/* )} */}
      </div>
      <div className="flex gap-2">
        <button className="min-w-[76px] h-[24px] rounded-[5px] border border-gray3 p-2 gap-2 flex justify-center items-center text-xs leading-[18px] font-medium">
          <Single_logo_color />
          추천 <span>{data?.list?.content?.[0]?.recommendCount}</span>
        </button>
        <button className="w-auto min-w-[60px] h-[24px] rounded-[5px] border border-gray3 px-[8px] py-[6px] gap-[10px] text-xs font-medium leading-[12px] tracking-[-0.02em]">
          답글 달기
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
