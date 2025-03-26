import React from "react";

interface FeedbackItemProps {
  status: string;
}

const FeedbackItemStatus = ({ status }: FeedbackItemProps) => {
  let text = "";
  let textClass = "";

  if (status === "RECEIVED") {
    text = "접수 완료";
    textClass = "text-gray7";
  } else if (status === "COMPLETED") {
    text = "개선 완료";
    textClass = "text-gra";
  } else {
    text = "";
  }

  const bgStyle =
    (status === "RECEIVED" && "bg-gray1") ||
    (status === "COMPLETED" && "bg-bg0");

  const baseStyle = `${bgStyle} w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] font-bold text-[14px] leading-5`;

  return (
    <div className={`${baseStyle}`}>
      {text ? <p className={`${textClass}`}>{text}</p> : null}
    </div>
  );
};

export default FeedbackItemStatus;
