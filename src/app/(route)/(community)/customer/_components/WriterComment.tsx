import React from "react";
import Image from "next/image";
import Single_logo_color from "@/app/_components/icon/Single_logo_color";

const WriterComment = () => {
  return (
    <div className="w-full min-h-[112px] border-b p-3 flex flex-col gap-3 border-[#FAFAFA]">
      <div className="w-full max-w-[648px] min-h-[52px] flex flex-col gap-3">
        <div className="w-full min-h-[20px] flex justify-between">
          <div className="min-w-[328px] h-auto flex gap-2">
            <div className="min-w-[43px] h-[20px] rounded-[2px] p-[6px] flex gap-[10px] bg-[#424242]">
              <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] flex items-center text-[#FFFFFF]">
                작성자
              </p>
            </div>
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
          </div>
          <div>
            <p className="text-xs text-[#A6A6A6] leading-[14px] font-medium cursor-pointer">
              신고
            </p>
          </div>
        </div>
        <p className="text-[14px] leading-5">
          이건 추가된 작성자인데 업데이트 부탁!
        </p>
      </div>
      <div className="flex gap-2">
        <button className="min-w-[76px] h-[24px] rounded-[5px] border border-[#DBDBDB] p-2 gap-2 flex justify-center items-center text-xs leading-[18px] font-medium">
          <Single_logo_color />
          추천 2
        </button>
        <button className="w-auto min-w-[60px] h-[24px] rounded-[5px] border border-[#DBDBDB] px-[8px] py-[6px] gap-[10px] text-xs font-medium leading-[12px] tracking-[-0.02em]">
          답글 달기
        </button>
      </div>
    </div>
  );
};

export default WriterComment;
