"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/utils";

const ProfileImageBox = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "w-[85px] h-[40px] rounded-[5px] border px-4 text-white border-gray3",
            "font-medium text-[14px] leading-5 text-gray7 text-nowrap"
          )}
        >
          사진 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileImageBox;
