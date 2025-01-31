import Customer_pencil from "@/app/_components/icon/Customer_pencil";
import React from "react";
// import PrivacyPolicyTab from "./_components/PrivacyPolicyTab";
// import FeedbackTab from "./_components/FeedbackTab";
import NoticeTab from "./_components/NoticeTab";
import MenuBtn from "./_components/MenuBtn";

export const metadata = {
  title: "PlayHive 고객센터 페이지",
  description: "PlayHive 고객센터 페이지입니다.",
};

const page = () => {
  return (
    <div className="flex justify-center items-center gap-6 mt-[34px]">
      <div className="w-[1200px] min-h-[820px] h-auto flex flex-col gap-10 justify-center items-center">
        <div className="w-full min-h-[212px] flex flex-col gap-6">
          <h1 className="text-[28px] leading-10 font-[700]">고객센터</h1>
          <div className="w-full min-h-[72px] flex gap-10 justify-between bg-[#FAFAFA] rounded-[5px] p-4">
            <div className="min-w-[1008px] w-auto min-h-[28px] flex items-center gap-5">
              <Customer_pencil />
              <span className="font-[700] text-[18px] leading-7">
                궁금한 내용을 1:1 문의하기에 남겨주세요.
              </span>
            </div>
            <button className="min-w-[120px] min-h-[40px] h-auto py-[13px] px-4 flex gap-[10] justify-center rounded-[5px] bg-[#00ADEE] text-[#FFFFFF] text-[14px] font-[700] leading-[14px]">
              1:1 문의하기
            </button>
          </div>

          <MenuBtn />
        </div>

        <div>
          <NoticeTab />
        </div>
      </div>
    </div>
  );
};

export default page;
