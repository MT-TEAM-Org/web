import { cn } from "@/utils";
import React from "react";
import RadioGroup from "./RadioGroup";
import SearchGroup from "./SearchGroup";
import DateGroup from "./DateGroup";

const style = {
  buttonStyle:
    "w-[120px] min-h-[40px] rounded-[5px] border px-4 py-[13px] text-center border-gray3 font-bold text-[14px] text-gray7 transition-colors",
  searchBoxStyle: "w-full rounded-[5px] border border-gray2 border-b-0",
};

const SearchFilter = () => {
  const button = [
    {
      name: "초기화",
      value: "init",
      style: "bg-white border-gray3 hover:bg-gray1",
    },
    {
      name: "검색",
      value: "search",
      style: "bg-Primary text-white hover:bg-primary/80",
    },
  ];

  // 검색 필터 버튼 핸들러
  const handleButton = (value: string) => {
    console.log("버튼 클릭", value);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex h-[56px] justify-between items-center">
        <h2 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          검색 필터
        </h2>
        <div className="flex gap-2">
          {button.map((button) => (
            <button
              key={button.value}
              className={cn(style.buttonStyle, button.style)}
              onClick={() => handleButton(button.value)}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className={cn(style.searchBoxStyle, "rounded-r-none border-r-0")}>
          <RadioGroup
            label="회원 여부"
            name="memberType"
            options={[
              { id: "member", label: "회원" },
              { id: "non-member", label: "비회원" },
            ]}
          />
          <RadioGroup
            label="처리 상태"
            name="status"
            options={[
              { id: "waiting", label: "답변대기" },
              { id: "completed", label: "답변완료" },
            ]}
          />
          <SearchGroup
            label="문의내용"
            name="content"
            placeholder="검색어를 입력해 주세요."
          />
        </div>
        <div className={cn(style.searchBoxStyle, "rounded-l-none border-l-0")}>
          {/* 작성기간 */}
          <DateGroup />

          <SearchGroup
            label="닉네임"
            name="nickname"
            placeholder="닉네임을 입력해 주세요."
          />
          <SearchGroup
            label="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
