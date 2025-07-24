import usePostFeedbackStatus from "@/_hooks/fetcher/customer/usePostFeedbackStatus";
import { cn } from "@/utils";
import React, { useState, useEffect } from "react";

const radioClassNames = `
  w-6 
  h-6 
  border
  border-gray3
  rounded-full
  relative
  flex
  items-center
  justify-center
  mobile:w-[16px]
  mobile:h-[16px]
`;

const selectedRadioClassNames = `
  bg-black
  after:content-['']
  after:absolute
  after:top-1/2
  after:left-1/2
  after:w-[12px]
  after:h-[12px]
  after:mobile:w-[8px]
  after:mobile:h-[8px]
  after:bg-white
  after:rounded-full
  after:-translate-x-1/2
  after:-translate-y-1/2
`;

const statusOptions = [
  { label: "접수 전", value: "PENDING" },
  { label: "접수 완료", value: "RECEIVED" },
  { label: "개선 완료", value: "COMPLETED" },
] as const;

type FeedbackStatus = "PENDING" | "RECEIVED" | "COMPLETED";

interface StatusSaverProps {
  id: string | string[];
  status: FeedbackStatus;
}

const StatusSaver = ({ id, status }: StatusSaverProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<FeedbackStatus>("PENDING");

  useEffect(() => {
    if (status) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus("PENDING");
    }
  }, [status]);

  const { mutate: feedbackUpdate } = usePostFeedbackStatus({ id, status });

  const handleUpdatedStatus = () => {
    feedbackUpdate({ id, status: selectedStatus });
  };

  return (
    <div
      className={cn(
        "min-w-[672px] h-[40px] flex justify-between items-center",
        "tablet:min-w-[648px]",
        "mobile:min-w-[328px] mobile:h-[24px]"
      )}
    >
      <div
        className={cn(
          "min-w-[272px] h-[24px] flex gap-4",
          "mobile:min-w-[206px] mobile:gap-3 mobile:h-[16px]"
        )}
      >
        {statusOptions.map(({ label, value }, index) => (
          <label
            key={index}
            className={cn(
              "min-w-[84px] h-[24px] flex items-center gap-2 text-[14px] leading-[22px] text-gray7 font-[500] tracking-[-0.02em]",
              "mobile:min-w-[64px] mobile:text-[12px] mobile:[18px] mobile:tracking-[0.02em]",
              "cursor-pointer"
            )}
          >
            <input
              type="radio"
              name="status"
              value={value}
              checked={selectedStatus === value}
              onChange={() => setSelectedStatus(value as FeedbackStatus)}
              className="hidden"
            />
            <div
              className={`${radioClassNames} ${
                selectedStatus === value ? selectedRadioClassNames : ""
              }`}
            />
            <p>{label}</p>
          </label>
        ))}
      </div>
      <button
        className={cn(
          "w-[120px] h-[40px] rounded-[5px] px-4 py-[16px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center",
          "mobile:w-[60px] mobile:h-[24px] mobile:text-[12px] mobile:tracking-[-0.02em]"
        )}
        onClick={handleUpdatedStatus}
      >
        저장
      </button>
    </div>
  );
};

export default StatusSaver;
