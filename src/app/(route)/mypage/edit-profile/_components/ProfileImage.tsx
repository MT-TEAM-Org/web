"use client";

import Image from "next/image";
import { useRef } from "react";

interface ProfileImageProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

const ProfileImage = ({ imageUrl, setImageUrl }: ProfileImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[4px] items-center w-full min-h-[158px]">
      <p className="text-center text-[14px] leading-[22px] text-[#424242]">
        프로필 사진
      </p>
      <div className="flex flex-col items-center gap-[12px]">
        <Image
          src={imageUrl || "/userProfileIsNull.png"}
          alt="profile-image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <input type="file" className="hidden" ref={inputRef} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center h-[40px] rounded-[5px] border-[1px] border-[#DBDBDB] px-[16px] py-[13px] text-[14px] leading-[22px] text-[#424242]"
        >
          사진 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
