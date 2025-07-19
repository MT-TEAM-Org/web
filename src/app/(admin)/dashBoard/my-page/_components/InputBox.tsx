import { cn } from "@/utils";
import React from "react";

const InputBox = () => {
  return (
    <>
      <div className="w-full h-[74px] flex flex-col items-start justify-center gap-1">
        <p className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
          아이디<span className="text-warning">*</span>
        </p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          readOnly
          className="w-full h-[48px] rounded-[5px] border px-4 py-3 text-gray2 border-gray3"
        />
      </div>
      {/* 비밀번호 */}
      <div className="w-full h-[100px] flex flex-col items-start justify-center gap-1">
        <p className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
          비밀번호<span className="text-warning">*</span>
        </p>
        <input
          type="text"
          placeholder="비밀번호를 입력해주세요"
          readOnly
          className="w-full h-[48px] rounded-[5px] border px-4 py-3 text-gray2 border-gray3"
        />
        <p className="px-4 font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray5">
          영문+숫자 조합 4자~10자 이내
        </p>
      </div>
      {/* 닉네임 */}
      <div className="w-full h-[100px] flex flex-col items-start justify-center gap-1">
        <p className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
          닉네임<span className="text-warning">*</span>
        </p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          readOnly
          className="w-full h-[48px] rounded-[5px] border px-4 py-3 text-gray2 border-gray3"
        />
        <p className="px-4 font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray5">
          한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)
        </p>
      </div>
      <button
        className={cn(
          "w-[120px] h-[40px] rounded-[5px] px-4 bg-Primary",
          "font-bold text-[14px] text-white"
        )}
      >
        수정 완료
      </button>
    </>
  );
};

export default InputBox;
