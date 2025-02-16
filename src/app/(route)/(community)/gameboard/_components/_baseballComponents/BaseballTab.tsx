"use client";

import React, { useState } from "react";
import BaseballStrengthItem from "./BaseballStrengthItem";
import BaseballStrengthPlayerItem from "./BaseballStrengthPlayerItem";
import BaseballNavbar from "./BaseballNavbar";
import BaseballPlayerInfo from "./BaseballPlayerInfo";
import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import BaseballBestPlayer from "./BaseballBestPlayer";
import BaseballTopPlayers from "./BaseballTopPlayers";
import BenchPlayers from "../BenchPlayers";
import BenchPitchers from "../BenchPitchers";
import LiveMatchPanel from "../LiveMatchPanel";
import CommentBox from "../CommentBox";
import BaseballGameRecord from "./BaseballGameRecord";
import BaseballTeamDetail from "./BaseballTeamDetail";

const homeRuns = [
  {
    player: "박병호16호",
    details: "(2회4점 임기영)",
  },
  {
    player: "박찬호",
    details: "(3회3점 이승현)",
  },
  {
    player: "디아즈4호",
    details: "(4회2점 김대유)",
  },
  {
    player: "소크라테스",
    details: "(6회 2사 2,3루서 우익수 2루타)",
  },
  {
    player: "소크라테스",
    details: "(6회 2사 2,3루서 우익수 2루타)",
  },
];

const BaseballTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("전력");

  return (
    <div className="w-[800px] min-h-[935px] flex flex-col gap-6">
      <BaseballNavbar setSelectedCategory={setSelectedCategory} />
      {selectedCategory === "전력" && (
        <>
          <BaseballStrengthItem />
          <BaseballStrengthPlayerItem />
        </>
      )}

      {selectedCategory === "라인업" && (
        <>
          <div className="w-full min-h-[1306px] flex gap-10">
            <BaseballPlayerInfo
              title={"삼성"}
              teamLogo={<Fake_scheduleItem />}
              photo="/Fake_baseballLineupPlayer.png"
            />
            <div className="w-[2px] height-[1306px] bg-[#EEEEEE]" />
            <BaseballPlayerInfo
              title={"삼성"}
              teamLogo={<Fake_scheduleItem />}
              photo="/Fake_baseballLineupPlayer2.png"
            />
          </div>
          <BenchPlayers />
          <BenchPitchers />
        </>
      )}

      {selectedCategory === "기록" && (
        <div className="w-[804px] min-h-[3652px] flex flex-col gap-10">
          <BaseballBestPlayer />
          <BaseballTopPlayers />
          <div className="w-full min-h-[676px] flex flex-col gap-3">
            <BaseballGameRecord />
          </div>
          <BaseballTeamDetail title="타자기록" />
          <BaseballTeamDetail title="투수기록" />
        </div>
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

export default BaseballTab;
