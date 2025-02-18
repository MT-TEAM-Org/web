import React from "react";

const page = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b bg-[#FFFFFF] flex flex-col">
      <div className="w-full max-w-[720px] min-h-[64px] border-b p-3 flex justify-between border-[#EEEEEE]">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
          이용약관
        </h1>
      </div>
      <div className="w-full h-auto p-3 font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-[#656565]"></div>
    </div>
  );
};

export default page;
