import React from "react";
import Image from "next/image";
import Single_logo_color from "@/app/_components/icon/Single_logo_color";

interface CommentItemProps {
  className?: string;
  data?: {
    commentImg?: string;
    nestedComments?: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ className, data }) => {
  return (
    <div
      className={`max-w-full min-h-[132px] flex flex-col border-b border-[#FAFAFA] gap-3 p-3 ${className}`}
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
          <p className="text-sm text-[#656565] leading-5 font-medium">
            손흥민매니아진심응원
            {/* 목 데이터 */}
          </p>
          <p className="text-xs text-[#A6A6A6] leading-4 font-medium">1분 전</p>
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

      {data?.commentImg && (
        <div>
          <Image
            src={data.commentImg}
            alt="comment img"
            width={200}
            height={200}
          />
        </div>
      )}
      <div className="flex flex-">
        {data?.nestedComments && (
          <div>
            <p className="font-bold text-[14px] leading-5 text-[#00ADEE]">
              {data?.nestedComments}
            </p>
          </div>
        )}
        {data?.nestedComments ? (
          <p className="font-medium text-[14px] leading-5 text-[#424242]">
            &nbsp; 깔끔디자인 좋네요
          </p>
        ) : (
          <p className="text-sm text-[#424242] leading-5 font-medium">
            와 손흥민지리네 쩐다와 손흥민지리네 쩐다와 손흥민지리네 쩐다지리네
            쩐다와 손흥민지리네 쩐다지리네 쩐다와 손흥민지리네 쩐다지리네 쩐다와
            손흥민지리네 쩐다
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button className="min-w-[76px] h-[24px] rounded-[5px] border border-[#DBDBDB] p-2 gap-2 flex justify-center items-center text-xs leading-[18px] font-medium">
          <Single_logo_color />
          추천 343
        </button>
        <button className="w-auto min-w-[60px] h-[24px] rounded-[5px] border border-[#DBDBDB] px-[8px] py-[6px] gap-[10px] text-xs text-medium leading-[12px] tracking-[-0.02em]">
          답글 달기
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
