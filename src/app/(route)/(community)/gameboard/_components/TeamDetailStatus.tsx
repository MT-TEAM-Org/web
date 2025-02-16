import React from "react";

const recordTeamDetail = [
  { title: "득점" },
  { title: "PK골" },
  { title: "도움" },
  { title: "슈팅" },
  { title: "유효슈팅" },
  { title: "패스시도" },
  { title: "패스성공" },
  { title: "인터셉트" },
  { title: "태클성공" },
  { title: "파울" },
  { title: "걷어내기" },
  { title: "경고" },
  { title: "퇴장" },
  { title: "기대득점" },
  { title: "기대도움" },
];

type TeamType = {
  teamLogo: React.ReactNode;
  title: string;
};

const TeamDetailStatus = ({ title, teamLogo }: TeamType) => {
  return (
    <div className="w-full min-h-[700px] flex flex-col gap-3">
      <div className="min-w-[152px] min-h-[38px] flex gap-2 justify-start items-center">
        {teamLogo}
        <p className="font-medium text-[18px] leading-7 tracking-[0.04em] text-[#303030]">
          {title}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <div className="w-full h-[48px] border-t border-[#424242] bg-[#FAFAFA] flex">
          <div className="w-[72px] h-full max-h-[48px] flex flex-col justify-start items-start py-[10px] gap-[2px]">
            <p className="text-[10px] leading-[14px] tracking-[-0.02em] text-[#A6A6A6]">
              포지션
            </p>
            <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#303030]">
              선수명
            </p>
          </div>
          <div className="w-full max-w-[728px] h-full min-h-[48px] flex justify-between items-center">
            {recordTeamDetail.map((record, index) => (
              <p
                key={index}
                className="w-full flex items-center justify-center text-center font-bold text-[12px] leading-[18px] tracking-[-0.02em]"
              >
                {record.title}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full h-[40px] border-t flex flex-col items-center">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[40px] border-t flex items-center"
            >
              <div className="w-[72px] h-full max-h-[48px] flex flex-col justify-center items-start py-[10px] gap-[2px]">
                <p className="text-[10px] leading-[14px] tracking-[-0.02em] text-[#A6A6A6]">
                  유격수
                </p>
                <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#303030]">
                  1 박찬호
                </p>
              </div>
              <div className="w-full max-w-[728px] h-full min-h-[48px] flex justify-between items-center text-center">
                {Array.from({ length: 15 }).map((_, index) => (
                  <p
                    key={index}
                    className="w-[48.53px] min-h-[40px] flex items-center justify-center text-[12px] leading-[18px] tracking-[-0.02em]"
                  >
                    0
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailStatus;
