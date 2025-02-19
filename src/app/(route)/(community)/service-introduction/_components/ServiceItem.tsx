import React from "react";

interface itemType {
  title: string;
  content: string;
}

const ServiceItem = ({ title, content }: itemType) => {
  return (
    <div className="min-w-[320px] min-h-[300px] rounded-[20px] shadow-md flex flex-col overflow-hidden">
      <div className="w-full h-full bg-gray-400 flex items-center justify-center">
        <div className="min-w-[140px] min-h-[140px] rounded-[99px] bg-white p-5 flex gap-[10px]"></div>
      </div>
      <div className="w-[320px] min-h-[100px] px-4 pb-4 text-center text-[18px] leading-7 tracking-[-0.04em] text-[#424242]">
        <p className="font-bold">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
