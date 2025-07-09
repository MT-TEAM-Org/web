import { cn } from "@/utils";
import React from "react";

const mockData = [
  { name: "처리상태", value: "답변대기", style: "text-warning" },
  { name: "작성날짜", value: "2025.05.05 / 18:24:32 (IP 106.101.44.321)" },
  { name: "문의유형", value: "일반문의" },
  { name: "회원 여부", value: "비회원" },
  { name: "닉네임", value: "-" },
  { name: "이메일", value: "hive@gmail.com" },
  {
    name: "내용",
    value:
      "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
  },
];

const InquiriesMeta = () => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
          문의 정보
        </h2>
        <button className="w-[120px] h-[40px] rounded-[5px] text-center bg-gra text-white font-bold text-[14px] transition-colors hover:bg-gra/80">
          저장
        </button>
      </div>
      <div className="flex flex-col">
        {mockData.map((item, idx) => (
          <div
            className="w-full min-h-[40px] flex items-center border border-gray2 border-b-0"
            key={idx}
          >
            <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              {item.name}
            </p>
            <p className={cn("flex-1 px-4 py-2 bg-white h-full", item.style)}>
              {item.value}
            </p>
          </div>
        ))}
        <div className="w-full min-h-[40px] flex items-center border border-gray2">
          <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
            답변
          </p>
          <div className="flex-1 px-4 py-2">
            <input
              type="text"
              placeholder="내용을 입력해 주세요"
              className="w-full min-h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiriesMeta;
