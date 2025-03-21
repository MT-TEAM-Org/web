import usePostFeedbackStatus from "@/_hooks/fetcher/customer/usePostFeedbackStatus";
import React, { useState } from "react";

const inputClassNames = `
  w-6 
  h-6 
  appearance-none 
  border
  border-gray3
  rounded-full
  checked:bg-black 
  checked:relative 
  checked:after:content-[''] 
  checked:after:absolute 
  checked:after:top-1/2 
  checked:after:left-1/2 
  checked:after:w-[12px] 
  checked:after:h-[12px] 
  checked:after:bg-white 
  checked:after:rounded-full
  checked:after:-translate-x-1/2 
  checked:after:-translate-y-1/2 
  cursor-pointer
`;

const statusOptions = [
  { label: "접수 전", value: "pending" },
  { label: "접수 완료", value: "received" },
  { label: "개선 완료", value: "completed" },
];

const StatusSaver = ({ id }) => {
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const { mutate: feedbackUpdate } = usePostFeedbackStatus({ id });

  const handleUpdatedStatus = () => {};

  return (
    <div className="min-w-[672px] h-[40px] flex justify-between items-center">
      <div className="min-w-[272px] h-[24px] flex gap-4">
        {statusOptions.map(({ label, value }, index) => (
          <div
            key={index}
            className="min-w-[84px] h-[24px] flex gap-2 text-[14px] leading-[22px] text-gray7 font-[500] tracking-[-0.02em]"
          >
            <input
              type="radio"
              name="status"
              value={value}
              checked={selectedStatus === value}
              onChange={() => setSelectedStatus(value)}
              className={inputClassNames}
            />
            <p>{label}</p>
          </div>
        ))}
      </div>
      <button className="w-[120px] h-[40px] rounded-[5px] px-4 py-[16px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center">
        저장
      </button>
    </div>
  );
};

export default StatusSaver;
