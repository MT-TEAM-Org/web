import React from "react";
import ProfileImageBox from "./_components/ProfileImageBox";
import InputBox from "./_components/InputBox";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[32px]">
      <h1 className="font-bold text-[24px] leading-[44px] tracking-[-0.04em] text-black">
        내 정보 수정
      </h1>
      <div className="w-[400px] h-auto flex flex-col items-center justify-center gap-5">
        {/* 프로필 이미지 변경 */}
        <ProfileImageBox />

        {/* 아이디 */}
        <InputBox />
      </div>
    </div>
  );
};

export default page;
