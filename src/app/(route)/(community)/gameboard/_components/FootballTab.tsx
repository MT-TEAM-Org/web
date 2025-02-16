"use client";

import React from "react";
import FootballGameTime from "./FootballGameTime";
import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import FootballSubPlayersList from "./FootballSubPlayersList";
import GameboardFooter from "./GameboardFooter";
import FootballNavbar from "./FootballNavbar";

const FootballTab = () => {
  return (
    <div className="w-[800px] min-h-[1455px] flex flex-col gap-6 items-center">
      <div className="w-full max-w-[800px] min-h-[52px] flex justify-center items-center">
        <FootballNavbar />
      </div>
      <FootballGameTime />
      <div className="w-[400px] h-[605px] flex flex-col items-center justify-center">
        <div className="w-full h-[37.78px] flex gap-[2px] items-center justify-center rounded-t-[10px] border">
          <Fake_scheduleItem />
          <p>3-4-2-1</p>
        </div>
        <div className="w-[400px] h-[264.48px] bg-[#28cd19]"></div>
        <div className="w-[400px] h-[264.48px] bg-[#28cd19]"></div>
        <div className="w-full h-[37.78px] flex gap-[2px] items-center justify-center rounded-b-[10px] border">
          <Fake_scheduleItem2 />
          <p>4-4-2</p>
        </div>
      </div>
      <div className="w-full max-w-[800px] min-h-[666px] flex flex-col">
        <div className="w-full min-h-[586px] flex gap-8">
          <FootballSubPlayersList />
          <div className="w-[2px] h-[540px] bg-[#EEEEEE]" />
          <FootballSubPlayersList />
        </div>
        <GameboardFooter />
      </div>
    </div>
  );
};

export default FootballTab;
