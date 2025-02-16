import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import React from "react";

const FootballLivePanel = () => {
  return (
    <div className="w-full max-w-[800px] h-[440px] p-3 flex flex-col gap-3 justify-center items-center">
      <div className="flex justify-center items-center">
        <LogoWhite />
      </div>
      <div className="flex justify-center items-center">라인업이 없습니다.</div>
    </div>
  );
};

export default FootballLivePanel;
