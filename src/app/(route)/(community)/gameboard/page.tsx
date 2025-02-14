import React from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import ScheduleNavbar from "./_components/ScheduleNavbar";
import LiveChat from "./_components/LiveChat";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import CommentItem from "../news/news-detail/[id]/_components/CommentItem";
import Plus from "@/app/_components/icon/Plus";
import SendCommentBox from "../news/news-detail/[id]/_components/SendCommentBox";
import LiveMatchBox from "./_components/LiveMatchBox";
import LiveMatchPanel from "./_components/LiveMatchPanel";
import EmptyComment from "./_components/EmptyComment";

export const metadata = {
  title: "경기중계 페이지",
  description: "경기중계 페이지입니다.",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="w-[1920px] h-auto min-h-[226px] flex flex-col gap-3 items-center justify-center bg-[#FAFAFA]">
        <ScheduleNavbar />
        <ScheduleContainer />
      </div>

      <div className="flex flex-col">
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
              </div>
            </div>
          </div>
          <LiveChat />
        </div>
        <div className="w-[800px] min-h-[72px]">
          <SendCommentBox />
        </div>
      </div>
    </div>
  );
};

export default Page;
