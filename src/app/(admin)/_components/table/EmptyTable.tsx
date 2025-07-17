import React from "react";

const EmptyTable = () => {
  return (
    <div className="w-full h-[360px] bg-gray1 rounded-[10px] flex items-center justify-center">
      <p className="font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray7">
        데이터가 없습니다.
      </p>
    </div>
  );
};

export default EmptyTable;
