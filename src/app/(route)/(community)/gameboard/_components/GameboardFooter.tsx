import React from "react";

const GameboardFooter = () => {
  return (
    <div className="w-full max-w-[800px] h-[80px] p-4 flex flex-col gap-4 items-center justify-center">
      <div className="w-[422px] min-h-[48px] text-[16px] leading-6 align-center text-[#A6A6A6]">
        <p className="text-center">
          출전 선수 라인업 및 포메이션은 확정 후 반영됩니다. 해당 내용은
          제공받고 있는 데이터이며, 실제 경기와 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default GameboardFooter;
