import usePostFeedbackStatus from "@/_hooks/fetcher/customer/usePostFeedbackStatus";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

const radioClassNames = `
  w-6 
  h-6 
  border
  border-gray3
  rounded-full
  cursor-pointer
  relative
  flex
  items-center
  justify-center
`;

const selectedRadioClassNames = `
  bg-black
  after:content-['']
  after:absolute
  after:top-1/2
  after:left-1/2
  after:w-[12px]
  after:h-[12px]
  after:bg-white
  after:rounded-full
  after:-translate-x-1/2
  after:-translate-y-1/2
`;

const statusOptions = [
  { label: "접수 전", value: "PENDING" },
  { label: "접수 완료", value: "RECEIVED" },
  { label: "개선 완료", value: "COMPLETED" },
];

const StatusSaver = ({ id, status }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus("PENDING");
    }
  }, [status]);

  const { mutate: feedbackUpdate } = usePostFeedbackStatus({ id });

  const handleUpdatedStatus = () => {
    feedbackUpdate(id);
  };

  return (
    <div className="min-w-[672px] h-[40px] flex justify-between items-center">
      <div className="min-w-[272px] h-[24px] flex gap-4">
        {statusOptions.map(({ label, value }, index) => (
          <div
            key={index}
            className="min-w-[84px] h-[24px] flex gap-2 text-[14px] leading-[22px] text-gray7 font-[500] tracking-[-0.02em]"
          >
            <div
              className={`${radioClassNames} ${
                selectedStatus === value ? selectedRadioClassNames : ""
              }`}
              onClick={() => setSelectedStatus(value)}
            />
            <p>{label}</p>
          </div>
        ))}
      </div>
      <button
        className="w-[120px] h-[40px] rounded-[5px] px-4 py-[16px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center"
        onClick={handleUpdatedStatus}
      >
        저장
      </button>
    </div>
  );
};

export default StatusSaver;
