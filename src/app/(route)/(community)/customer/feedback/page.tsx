import React from "react";
import { CustomerTalkToolbar } from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import FeedbackNoticeItem from "../_components/FeedbackNoticeItem";

const page = () => {
  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] border-b">
        <CustomerTalkToolbar showOptions={true} />
      </div>

      <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        {Array.from({ length: 2 }).map((_, index) => {
          return <FeedbackNoticeItem key={index} />;
        })}
        {Array.from({ length: 20 }).map((_, index) => (
          <FeedbackItem
            key={index}
            completed={index % 2 === 0}
            number={index + 1}
          />
        ))}
      </div>
      {/* <EmptyNoticeItem /> 공지사항 없을 때 */}
    </>
  );
};

export default page;
