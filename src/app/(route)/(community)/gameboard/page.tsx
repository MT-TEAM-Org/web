"use client";

import React, { useState } from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import ScheduleNavbar from "./_components/ScheduleNavbar";
import LiveMatchBox from "./_components/LiveMatchBox";
import LiveMatchPanel from "./_components/LiveMatchPanel";
import CommentBox from "./_components/CommentBox";
import BaseballTab from "./_components/_baseballComponents/BaseballTab";
import FootballTab from "./_components/_footballComponents/FootballTab";
import LiveChat from "./_components/_LiveChatComponents/LiveChat";
import useGetMatchSchedule from "@/_hooks/useGetMatchSchedule";
// import EmptyComment from "./_components/EmptyComment";
// import FootballLivePanel from "./_components/FootballLivePanel";

// export const metadata = {
//   title: "경기중계 페이지",
//   description: "경기중계 페이지입니다.",
// };

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("E스포츠");
  const { data: matchListData } = useGetMatchSchedule();
  console.log(matchListData);

  return (
    <div className="flex flex-col gap-3 justify-center items-center mb-10">
      <div className="w-[1920px] h-auto min-h-[226px] flex flex-col gap-3 items-center justify-center bg-[#FAFAFA]">
        <ScheduleNavbar setSelectedCategory={setSelectedCategory} />
        <ScheduleContainer />
      </div>

      {selectedCategory === "E스포츠" && (
        <div className="min-w-[1200px] flex gap-10">
          <div className="w-[800px] flex flex-col gap-6">
            <LiveMatchBox />
            <div className="w-full max-w-[800px] flex flex-col gap-3">
              <LiveMatchPanel />
              <CommentBox />
            </div>
          </div>
          <LiveChat />
        </div>
      )}

      {selectedCategory === "축구" && (
        <div className="min-w-[1200px] min-h-[1455px] flex gap-10 justify-center">
          <FootballTab />
          <div>
            <LiveChat />
          </div>
        </div>
      )}

      {selectedCategory === "야구" && (
        <div className="min-w-[1200px] min-h-[935px] flex gap-10">
          <BaseballTab />
          <div>
            <LiveChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
