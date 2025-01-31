import React from "react";

const MenuBtn = () => {
  return (
    <div className="w-full min-h-[52px] h-auto flex items-center">
      <button className="min-w-[300px] w-auto h-[52px] border-t border-r rounded-tl-[5px] rounded-tr-md border-black px-4 py-[18px] flex justify-center gap-[10px] text-center">
        공지사항
      </button>
      <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-[18px] text-center">
        개선요청
      </button>
      <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-[18px] text-center">
        이용약관
      </button>
      <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-[18px] text-center">
        개인정보 취급방침
      </button>
    </div>
  );
};

export default MenuBtn;
