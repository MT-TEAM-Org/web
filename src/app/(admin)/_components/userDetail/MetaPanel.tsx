import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import RadioGroup from "@/app/(admin)/_components/search/RadioGroup";

const mockData = {
  inquiry: [
    { name: "처리상태", value: "답변대기", style: "text-warning" },
    { name: "작성날짜", value: "2025.05.05 / 18:24:32 (IP 106.101.44.321)" },
    { name: "문의유형", value: "일반문의" },
    { name: "회원 여부", value: "비회원" },
    { name: "닉네임", value: "-" },
    { name: "이메일", value: "hive12@gmail.com" },
    {
      name: "내용",
      value:
        "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
    },
  ],
  suggestions: [
    {
      name: "닉네임",
      value: "하이브짱짱",
    },
    {
      name: "작성날짜",
      value: "2025.05.05/18:24:32 (IP 106.101.44.321)",
    },
    {
      name: "제목",
      value: "개선요청 제목개선요청 제목개선요청 제목개선요청 제목",
    },
    {
      name: "내용",
      value:
        "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
    },
  ],
  content: [
    {
      name: "처리상태",
      value: "노출",
    },
    {
      name: "신고여부",
      value: "신고",
    },
    {
      name: "신고수",
      value: "12",
    },
    {
      name: "추천수",
      value: "12",
    },
    {
      name: "작성날짜",
      value: "2025.05.05/18:24:32 (IP 106.101.44.321)",
    },
    {
      name: "회원상태",
      value: "정상",
    },
    {
      name: "작성자",
      value: "hive짱짱12",
    },
    {
      name: "첨부링크",
      value: "https://www.vaver.com/23423432",
    },
    {
      name: "제목",
      value: "게시글제목게시글제목게시글제목게시글제목",
    },
    {
      name: "내용",
      value: "내용내용내용내용내용내용",
    },
    {
      name: "투표",
      value: "-",
    },
  ],
};

interface MetaPanelProps {
  type: "inquiry" | "suggestions" | "content";
  title: string;
}

const buttonStyle =
  "w-[120px] h-[40px] rounded-[5px] text-center text-white font-bold text-[14px] transition-colors flex items-center justify-center";

const MetaPanel = ({ type, title }: MetaPanelProps) => {
  const data = mockData[type]; // 타입 데이터

  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
          {title}
        </h2>
        <div className="flex gap-2 items-center">
          {type === "suggestions" ||
            (type === "content" && (
              <Link
                href="/"
                className={cn(
                  buttonStyle,
                  "bg-white border border-gray3 hover:bg-gray1 text-black"
                )}
              >
                게시물 새창열기
              </Link>
            ))}
          <button className={cn(buttonStyle, "bg-gra hover:bg-gra/80")}>
            저장
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="w-full min-h-[40px] flex items-center border border-gray2 border-b-0"
          >
            <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              {item.name}
            </p>
            <p
              className={cn(
                "flex-1 px-4 py-2 bg-white h-full font-medium text-[14px] leading-5",
                item.style
              )}
            >
              {item.value}
            </p>
          </div>
        ))}
        {type === "content" && (
          <RadioGroup
            label="처리 상태"
            name="status"
            type="radio"
            className="border border-gray2 border-b-0"
            options={[
              { id: "waiting", label: "노출" },
              { id: "completed", label: "보류" },
              { id: "success", label: "숨김" },
            ]}
          />
        )}
        <div className="w-full min-h-[40px] flex items-center border border-gray2">
          <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
            답변
          </p>
          <div className="flex-1 px-4 py-2">
            <input
              type="text"
              placeholder="내용을 입력해 주세요"
              className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
            />
          </div>
        </div>

        {type === "suggestions" && (
          <>
            <RadioGroup
              label="처리 상태"
              name="status"
              type="radio"
              options={[
                { id: "waiting", label: "접수 전" },
                { id: "completed", label: "접수완료" },
                { id: "success", label: "개선완료" },
              ]}
            />
            <RadioGroup
              label="중요도"
              name="importance"
              type="radio"
              options={[
                { id: "low", label: "낮음" },
                { id: "medium", label: "중간" },
                { id: "high", label: "높음" },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MetaPanel;
