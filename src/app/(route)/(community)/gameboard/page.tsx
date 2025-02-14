import React from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import ScheduleNavbar from "./_components/ScheduleNavbar";
import LiveChat from "./_components/LiveChat";

export const metadata = {
  title: "경기일정 페이지",
  description: "경기일정 페이지입니다.",
};

const Page = () => {
  return (
    <div className="flex flex-col p-6 gap-3 justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <ScheduleNavbar />
        <ScheduleContainer />
      </div>

      <div className="min-w-[1200px] min-h-[1888px] flex gap-10">
        <div className="w-[800px] min-h-[1888px] flex flex-col gap-6 bg-white">
          <div className="w-full max-w-[800px] h-[400px] rounded-[5px] bg-[#FAFAFA] flex  justify-center items-center">
            <div className="min-w-[294px] min-h-[38px] flex gap-2">
              <p className="w-[114px] h-[38px] font-bold text-[24px] leading-[38px] tracking-[0.04em] align-center text-[#00ADEE]">
                02:21:35 후
              </p>
              <p className="w-[172px] h-[38px] font-bold text-[24px] leading-[38px] tracking-[0.04em] align-center">
                경기가 시작됩니다
              </p>
            </div>
          </div>
          <div className="w-full max-w-[800px] min-h-[1424px] flex gap-3">
            <div className="w-full min-h-[148px] flex gap-2">
              <div className="min-w-[171px] min-h-[38px] flex gap-2">
                <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em]">
                  승부예측
                </h1>
                <div className="min-w-[81px] h-[28px] rounded-[5px] py-1 px-2 flex gap-1 bg-[#D1504B] text-[#FFFFFF]">
                  <p className="font-bold text-[14px] leading-5 align-center">
                    예측 진행중
                  </p>
                </div>
              </div>
              <div className="w-full max-w-[800px] min-h-[102px] flex gap-2">
                <div className="w-full min-h-[40px] flex gap-6">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LiveChat />
      </div>
    </div>
  );
};

export default Page;
