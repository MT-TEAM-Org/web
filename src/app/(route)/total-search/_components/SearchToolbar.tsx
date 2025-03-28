import React from "react";

const SearchToolbar = () => {
  return (
    <div className="w-full h-[120px] rounded-t-[5px] bg-white">
      <div className="w-full h-[64px] border-b flex justify-between p-3 border-gray2">
        <div className="min-w-[317px] min-h-[40px] flex gap-2 items-center justify-center">
          <button className="min-w-[57px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-gra text-white justify-center items-center">
            전체
          </button>
          <button className="min-w-[57px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-white text-black border border-gray3 justify-center items-center">
            일간
          </button>
          <button className="min-w-[57px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-white text-black border border-gray3 justify-center items-center">
            주간
          </button>
          <button className="min-w-[57px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-white text-black border border-gray3 justify-center items-center">
            월간
          </button>
          <button className="min-w-[57px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-white text-black border border-gray3 justify-center items-center">
            연간
          </button>
        </div>
        <div className="w-[356px] h-[40px] flex gap-2 items-center justify-center">
          <div>검색옵션 들어갈 부분</div>
        </div>
      </div>
      <div className="w-full min-h-[56px] flex justify-between p-3">
        <div className="w-[279px] min-h-[32px] flex gap-2">
          최신순인기순댓글
        </div>
        <div className="min-w-[112px] min-h-[32px] flex gap-2">
          페이지네이션
        </div>
      </div>
    </div>
  );
};

export default SearchToolbar;
