"use client";

import React, { useState } from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import ScheduleNavbar from "./_components/ScheduleNavbar";
import LiveChat from "./_components/LiveChat";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import CommentItem from "../news/news-detail/[id]/_components/CommentItem";
import Plus from "@/app/_components/icon/Plus";
import SendCommentBox from "../news/news-detail/[id]/_components/SendCommentBox";
import LiveMatchBox from "./_components/LiveMatchBox";
import LiveMatchPanel from "./_components/LiveMatchPanel";
import FootballNavbar from "./_components/FootballNavbar";
import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import FootballSubPlayersList from "./_components/FootballSubPlayersList";
import BaseballNavbar from "./_components/BaseballNavbar";
import GameboardFooter from "./_components/GameboardFooter";
// import EmptyComment from "./_components/EmptyComment";
// import FootballLivePanel from "./_components/FootballLivePanel";

// export const metadata = {
//   title: "경기중계 페이지",
//   description: "경기중계 페이지입니다.",
// };

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("E스포츠");

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
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
              <div className="w-full max-w-[800px] flex flex-col">
                <CommentBar />
                <div className="w-full h-auto">
                  <CommentItem />
                  <CommentItem data={{ commentImg: "/Fake_comment_img.png" }} />
                  <CommentItem
                    data={{ nestedComments: "@댓글유저디자인이렇게" }}
                  />
                  <CommentItem />
                  <CommentItem data={{ commentImg: "/Fake_comment_img.png" }} />
                  {/* <EmptyComment /> */}
                </div>
                <div className="flex items-center justify-center">
                  <button className="w-[160px] min-h-[40px] rounded-[5px] border px-4 py-[10px] flex gap-2 justify-center items-center font-bold text-[14px] leading-[14px] border-[#DBDBDB] bg-[#FAFAFA] text-[#424242] cursor-pointer">
                    <Plus />
                    댓글 더보기
                  </button>
                </div>
                <SendCommentBox />
              </div>
            </div>
          </div>
          <LiveChat />
        </div>
      )}

      {selectedCategory === "축구" && (
        <div className="min-w-[1200px] min-h-[1455px] flex gap-10 justify-center">
          <div className="w-[800px] min-h-[1455px] flex flex-col gap-6 items-center">
            <div>
              <FootballNavbar />
            </div>
            <div className="w-full min-h-[60px] p-4 flex gap-[10px] bg-[#FAFAFA] items-center justify-center font-bold text-[18px] leading-7 text-[#303030]">
              <p>경기시각</p>
              <p>45:02</p>
              <p>+2:15</p>
            </div>
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
          <div>
            <LiveChat />
          </div>
        </div>
      )}

      {selectedCategory === "야구" && (
        <div className="min-w-[1200px] min-h-[935px] flex gap-10">
          <BaseballNavbar />
          <div>
            <LiveChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
