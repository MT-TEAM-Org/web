"use client";

import Customer_pencil from "@/app/_components/icon/Customer_pencil";
import React, { useState } from "react";
import NoticeTab from "./_components/NoticeTab";
import FeedbackTab from "./_components/FeedbackTab";
import PrivacyPolicyTab from "./_components/PrivacyPolicyTab";
import MenuBtn from "./_components/MenuBtn";
import TermsTab from "./_components/TermsTab";

const page = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <NoticeTab />;
      case 1:
        return <FeedbackTab />;
      case 2:
        return <TermsTab />;
      default:
        return <PrivacyPolicyTab />;
    }
  };

  const renderTabTitle = () => {
    switch (activeTab) {
      case 0:
        return "공지사항";
      case 1:
        return "개선요청";
      case 2:
        return "이용약관";
      default:
        return "개인정보 취급방침";
    }
  };

  const renderContainerStyle = () => {
    switch (activeTab) {
      case 0:
        return "w-[1200px] min-h-[820px] h-auto flex flex-col gap-10 justify-center items-center";
      case 1:
        return "w-[1200px] h-[520px] h-auto flex flex-col gap-10 justify-center items-center";
      default:
        return "w-[1200px] min-h-[596px] h-auto flex flex-col gap-10 justify-center items-center";
    }
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-[40px]">
      <div className={renderContainerStyle()}>
        <div className="w-full min-h-[212px] flex flex-col gap-6">
          <h1 className="text-[28px] leading-10 font-[700]">
            {renderTabTitle()}
          </h1>
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

          <MenuBtn activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default page;
