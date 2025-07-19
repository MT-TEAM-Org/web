import React from "react";
import Image from "next/image";
import { cn } from "@/utils";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[32px]">
      <h1 className="font-bold text-[24px] leading-[44px] tracking-[-0.04em] text-black">
        내 정보 수정
      </h1>
      <div className="w-[400px] h-auto flex flex-col items-center justify-center gap-5">
        <div className="w-full h-auto flex flex-col items-center justify-center gap-1">
          <p className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
            프로필 사진
          </p>
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src={"/userProfileIsNull.png"}
              alt="프로필 이미지"
              width={80}
              height={80}
            />
            <input type="file" accept="image/*" className="hidden" />
            <button
              type="button"
              className={cn(
                "w-[85px] h-[40px] rounded-[5px] border px-4 text-white border-gray3",
                "font-medium text-[14px] leading-5 text-gray7 text-nowrap"
              )}
            >
              사진 수정
            </button>
          </div>
        </div>
        {/* 아이디 */}
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
      </div>
    </div>
  );
};

export default page;
