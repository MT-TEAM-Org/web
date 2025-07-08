import Icon from "@/app/_components/IconComponents";
import React from "react";
import InquiriesMeta from "./_components/InquiriesMeta";
import UserInquiriesList from "./_components/UserInquiriesList";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-start">
        <Icon icon="BACK_ARROW" />
        <h1 className="font-bold text-[24px] leading-38px] tracking-[-0.04em] text-black">
          문의 내역 상세
        </h1>
      </div>
      <div className="w-full flex gap-10">
        <InquiriesMeta />
        <UserInquiriesList />
      </div>
    </div>
  );
};

export default Page;
