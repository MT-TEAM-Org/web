import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React, { useRef } from "react";

const buttonStyle =
  "w-[120px] min-h-[40px] rounded-[5px] border px-4 py-[13px] text-center border-gray3 font-bold text-[14px] text-gray7";

const SearchFilter = () => {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const button = [
    {
      name: "초기화",
      value: "init",
      style: "bg-white border-gray3",
    },
    {
      name: "검색",
      value: "search",
      style: "bg-Primary text-white",
    },
  ];

  const radio = [
    {
      name: "회원",
      value: "member",
    },
    {
      name: "비회원",
      value: "non-member",
    },
  ];

  // 검색 필터 버튼 핸들러
  const handleButton = (value: string) => {
    console.log("버튼클릭됨", value);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          검색 필터
        </h2>
        <div className="flex gap-2">
          {button.map((button) => (
            <button
              key={button.value}
              className={cn(buttonStyle, button.style)}
              onClick={() => handleButton(button.value)}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="w-full rounded-[5px] rounded-r-none border border-gray2 border-b-0 border-r-0">
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <p className="">회원 여부</p>
            </div>
            <div className="px-3 py-2 flex gap-3 items-center">
              <label className="relative flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  id="member"
                  className="appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none checked:bg-primary checked:border-transparent"
                />
                <Icon
                  icon="FILTER_CHECKER"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </label>
              <label
                htmlFor="member"
                className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
              >
                회원
              </label>
              <label className="relative flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  id="non-member"
                  className="appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none checked:bg-primary checked:border-transparent"
                />
                <Icon
                  icon="FILTER_CHECKER"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </label>
              <label
                htmlFor="non-member"
                className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
              >
                비회원
              </label>
            </div>
          </div>
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <p className="">처리 상태</p>
            </div>
            <div className="px-3 py-2 flex gap-3 items-center">
              <label className="relative flex items-center">
                <input
                  type="radio"
                  name="status"
                  id="waiting"
                  className="appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none checked:bg-primary checked:border-transparent"
                />
                <Icon
                  icon="FILTER_CHECKER"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </label>
              <label
                htmlFor="waiting"
                className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
              >
                답변대기
              </label>
              <label className="relative flex items-center">
                <input
                  type="radio"
                  name="status"
                  id="completed"
                  className="appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none checked:bg-primary checked:border-transparent"
                />
                <Icon
                  icon="FILTER_CHECKER"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </label>
              <label
                htmlFor="completed"
                className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
              >
                답변완료
              </label>
            </div>
          </div>
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <label htmlFor="content">문의내용</label>
            </div>
            <div className="flex-1 p-3 flex items-center justify-start">
              <input
                id="content"
                type="text"
                placeholder="검색어를 입력해 주세요."
                className="w-full h-[40px] rounded-[5px] p-3 border border-gray3"
              />
            </div>
          </div>
        </div>
        <div className="w-full rounded-[5px] rounded-l-none border border-gray2 border-b-0 border-l-0">
          {/* 작성기간 */}
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <p>작성기간</p>
            </div>

            {/* 시작 날짜 */}
            <div className="relative flex flex-1 items-center px-3 py-2">
              <input
                type="text"
                placeholder="시작 날짜"
                className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
                onClick={() => startRef.current?.showPicker()}
              />
              <input type="date" ref={startRef} className="hidden" />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => startRef.current?.showPicker()}
              >
                <Icon icon="CALENDAR_ICON" />
              </div>
            </div>
            <span className="flex items-center justify-center text-center mx-3 font-normal text-[16px] leading-7 tracking-[-0.02em] text-gray7">
              ~
            </span>
            {/* 종료 날짜 */}
            <div className="relative flex flex-1 items-center px-3 py-2">
              <input
                type="text"
                placeholder="종료 날짜"
                className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
                onClick={() => endRef.current?.showPicker()}
              />
              <input type="date" ref={endRef} className="hidden" />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => endRef.current?.showPicker()}
              >
                <Icon icon="CALENDAR_ICON" />
              </div>
            </div>
          </div>
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <label htmlFor="nickname">닉네임</label>
            </div>
            <div className="flex-1 p-3 flex items-center justify-start">
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해 주세요."
                className="w-full h-[40px] rounded-[5px] p-3 border border-gray3"
              />
            </div>
          </div>
          <div className="flex border-b border-gray2">
            <div className="w-[100px] min-h-[56px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
              <label htmlFor="email">이메일</label>
            </div>
            <div className="flex-1 p-3 flex items-center justify-start">
              <input
                id="email"
                type="text"
                placeholder="이메일을 입력해 주세요."
                className="w-full h-[40px] rounded-[5px] p-3 border border-gray3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
