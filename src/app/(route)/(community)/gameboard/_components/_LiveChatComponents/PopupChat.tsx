import React from "react";

const PopupChat = () => {
  return (
    <div className="min-w-[328px] min-h-[528px] rounded-[5px] bg-[#FAFAFA] flex flex-col justify-center items-center text-center text-bold text-[16px] leading-6 tracking-[0.02em] text-[#424242]">
      <div className="w-[328px] min-h-[72px] flex flex-col gap-2 justify-center items-center">
        <p>채팅의 팝업 모드가 활성화 되었습니다.</p>
        <button className="w-fit h-fit rounded-[5px] border border-[#DBDBDB] px-4 py-[13px] flex items-center gap-[10px]">
          채팅보기
        </button>
      </div>
    </div>
  );
};

export default PopupChat;
