import React from "react";
import Image from "next/image";
import Single_logo_color from "@/app/_components/icon/Single_logo_color";

const ReplyCommentItem = () => {
  return (
    <div className="w-full max-w-[1280px] min-h-[112px] border-b p-3 flex gap-3 border-[#FAFAFA] bg-[#FAFAFA]">
      <div className="w-full max-w-[1256px] min-h-[88px] flex gap-3">
        <div className="w-[24px] h-[24px] bg-black"></div>
        <div className="w-full max-w-[1220px] min-h-[88px] flex flex-col gap-3">
          <div className="w-full min-h-[52px] flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-2">
                <Image
                  src="/Fake_commentImg.png"
                  alt="fake_img"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />

                <p className="text-sm text-[#656565] leading-5 font-medium">
                  손흥민매니아진심응원
                </p>
                <p className="text-xs text-[#A6A6A6] leading-4 font-medium">
                  1분 전
                </p>
                <p className="text-xs text-[#CBCBCB] leading-[18px] font-medium">
                  IP 106.101.**.***
                </p>
              </div>
              <div>
                <p className="text-xs text-[#A6A6A6] leading-[14px] font-medium cursor-pointer">
                  신고
                </p>
              </div>
            </div>
            <div className="text-[14px] leading-5 flex">
              <p className="font-bold text-[#00ADEE]">@댓글유저디자인이렇게</p>
              <span className="font-medium text-[#424242]">
                &nbsp; 깔끔디자인좋네요
              </span>
            </div>
          </div>
          <div className="min-w-[138px] min-h-[24px] flex gap-2">
            <div className="flex gap-2">
              <button className="min-w-[76px] h-[24px] rounded-[5px] border border-[#DBDBDB] p-2 gap-2 flex justify-center items-center text-xs leading-[18px] font-medium">
                <Single_logo_color />
                추천 45
              </button>
              <button className="w-auto min-w-[60px] h-[24px] rounded-[5px] border border-[#DBDBDB] px-[8px] py-[6px] gap-[10px] text-xs font-medium leading-[12px] tracking-[-0.02em]">
                답글 달기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCommentItem;
