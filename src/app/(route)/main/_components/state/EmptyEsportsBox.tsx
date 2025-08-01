import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import React from "react";

const EmptyEsportsBox = () => {
  return (
    <div className="w-[272px] h-[126px] border-t border-b rounded-[5px] py-[29px] px-3 flex justify-center items-center bg-white">
      <div className="w-auto min-w-[118.49px] h-auto min-h-[32px]">
        <LogoWhite />
      </div>
    </div>
  );
};

export default EmptyEsportsBox;
