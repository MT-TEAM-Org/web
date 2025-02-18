import React from "react";
import { CustomerTalkToolbar } from "../_components/CustomerTalkToolbar";
import NoticeItem from "../_components/NoticeItem";
import NoticeInfoItem from "./_components/NoticeInfoItem";

const page = () => {
  return (
    <>
      <NoticeInfoItem />
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] border-b">
        <CustomerTalkToolbar />
      </div>
      <div className="w-[720px] h-auto rounded-[5px] bg-[#FFFFFF]">
        {Array.from({ length: 20 }).map((_, index) => {
          return <NoticeItem key={index} number={20 - index} />;
        })}
      </div>
    </>
  );
};

export default page;
