"use client";

import React, { useState } from "react";
import FootballGameTime from "./FootballGameTime";
import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import FootballSubPlayersList from "./FootballSubPlayersList";
import FootballNavbar from "./FootballNavbar";
import FootballRecordTeams from "./FootballRecordTeams";
import GameboardFooter from "../GameboardFooter";
import TeamDetailStatus from "../TeamDetailStatus";
import LiveMatchPanel from "../LiveMatchPanel";
import CommentBox from "../CommentBox";

const FootballTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("라인업");

  return (
    <div className="w-[800px] min-h-[1455px] flex flex-col gap-6 items-center">
      <div className="w-full max-w-[800px] min-h-[52px] flex justify-center items-center">
        <FootballNavbar setSelectedCategory={setSelectedCategory} />
      </div>

      {selectedCategory === "라인업" && (
        <>
          <FootballGameTime />
          <div className="w-[400px] h-[605px] flex flex-col items-center justify-center">
            <div className="w-full h-[37.78px] flex gap-[2px] items-center justify-center rounded-t-[10px] border">
              <Fake_scheduleItem />
              <p>3-4-2-1</p>
              {/* 목 데이터 */}
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
        </>
      )}

      {selectedCategory === "기록" && (
        <>
          <FootballRecordTeams />
          <TeamDetailStatus
            title={"아우크스부르크"}
            teamLogo={<Fake_scheduleItem />}
          />
          <TeamDetailStatus
            title={"슈투트가르트"}
            teamLogo={<Fake_scheduleItem2 />}
          />
        </>
      )}

      {selectedCategory === "승부예측" && (
        <div className="flex flex-col gap-3">
          <LiveMatchPanel />
          <CommentBox />
        </div>
      )}
    </div>
  );
};

export default FootballTab;
