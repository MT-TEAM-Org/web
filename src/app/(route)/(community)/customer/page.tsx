import React from "react";
import { CustomerTalkToolbar } from "./_components/CustomerTalkToolbar";
import NoticeItem from "./_components/NoticeItem";

const Page = () => {
  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] border-b">
        <CustomerTalkToolbar showOptions={false} />
      </div>

      <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        {Array.from({ length: 20 }).map((_, index) => {
          return <NoticeItem key={index} number={20 - index} />;
        })}
      </div>
      {/* <EmptyNoticeItem /> 공지사항 없을 때 */}
    </>
  );
};

export default Page;
