import React from "react";

type PlayerProps = {
  name?: string;
  info?: string;
};

const BenchPlayerItem = ({ name, info }: PlayerProps) => {
  return (
    <div className="w-full max-w-[359px] min-h-[44px] border-b py-3 flex gap-3 border-[#DBDBDB]">
      <p className="text-[14px] leading-5">{name}</p>
      <p className="text-[14px] leading-5 text-[#A6A6A6]">{info}</p>
    </div>
  );
};

export default BenchPlayerItem;
