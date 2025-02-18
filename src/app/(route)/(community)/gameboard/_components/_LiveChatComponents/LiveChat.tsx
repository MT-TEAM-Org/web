import Plus from "@/app/_components/icon/Plus";
import Send_icon from "@/app/_components/icon/Send_icon";
import React from "react";
import BeforeChat from "./BeforeChat";
import PopupChat from "./PopupChat";
import ActiveChat from "./ActiveChat";

const LiveChat = () => {
  return (
    <div className="w-[360px] h-[600px] rounded-[10px] border p-4 flex flex-col gap-3 border-[#DBDBDB]">
      <div className="w-[328px] h-[32px] flex justify-between items-center">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.04em]">
          하이브챗
        </h1>
        <div className="min-w-[192px] min-h-[32px] flex gap-2">
          <button className="min-w-[89px] h-full rounded-[5px] border px-3 py-[9px] flex gap-[10px] border-[#DBDBDB]">
            클린봇 설정
          </button>
          <button className="min-w-[89px] h-full rounded-[5px] border px-3 py-[9px] flex gap-1 border-[#DBDBDB]">
            새창 열기
          </button>
        </div>
      </div>

      <div className="w-[328px] h-[18px] flex gap-3">
        <div className="min-w-[106px] min-h-[18px] flex gap-[2px]">
          <p className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
            현재 채팅 참여자수
          </p>
          <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#656565]">
            1명
          </p>
        </div>
        <div className="min-w-[106px] min-h-[18px] flex gap-[2px]">
          <p className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
            누적 채팅 참여자수
          </p>
          <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#656565]">
            1명
          </p>
        </div>
      </div>

      <div className="w-full max-w-[328px] h-full max-h-[494px] rounded-[5px] bg-[#FAFAFA]">
        <div className="w-full h-full max-w-[328px] max-h-[442px] flex flex-col justify-center text-center text-bold text-[16px] leading-6 tracking-[-0.02em]">
          <p>채팅이 없어요</p>
          <p>1빠 채팅을 날려볼까요?</p>
        </div>
        {/* <ActiveChat /> */}
        <div className="w-full max-w-[328px] min-h-[52px] pt-3 bg-[#FFFFFF]">
          <div className="w-full max-w-[328px] min-h-[40px] flex gap-2">
            <div className="w-[40px] h-[40px] rounded-[5px] border py-4 flex gap-[10px] border-[#EEEEE] items-center justify-center">
              <Plus />
            </div>
            <input
              type="text"
              className="w-full max-w-[232px] h-[40px] rounded-[5px] border px-4 py-3 flex gap-4"
              placeholder="플하~ 1빠"
            />
            <div className="w-[40px] h-[40px] rounded-[5px] border px-4 flex gap-[10px] border-[#EEEEEE] items-center justify-center">
              <Send_icon />
            </div>
          </div>
        </div>
      </div>
      {/* <BeforeChat /> */}
      {/* <PopupChat /> */}
    </div>
  );
};

export default LiveChat;
