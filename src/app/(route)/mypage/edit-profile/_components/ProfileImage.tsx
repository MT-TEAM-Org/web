"use client";

import Image from "next/image";
import { useRef } from "react";
import getUpload from "@/_hooks/getUpload";
import { useToast } from "@/_hooks/useToast";
import axios from "axios";

interface ProfileImageProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

const ProfileImage = ({ imageUrl, setImageUrl }: ProfileImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { error } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 형식 비교 JPG/JPEG, PNG 형식만 가능
    if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
      error("JPG/JPEG, PNG 형식만 업로드 가능합니다.", "");
      return;
    }

    // 이미지 사이즈 비교 1MB 이하
    if (file.size > 1024 * 1024) {
      error(`이미지 크기가 1MB까지 업로드 가능합니다.`, "");
      return;
    }

    try {
      const response = await getUpload({
        contentType: file.type,
        fileName: `image-${Date.now()}.${file.type.split("/")[1]}`,
      });
      const presignedUrl = response.data.presignedUrl;
      const downloadUrl = response.data.downloadUrl;
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });
      setImageUrl(downloadUrl);
    } catch {
      error("이미지 업로드에 실패했습니다.", "");
    }
    if (inputRef.current) inputRef.current.value = "";
  };

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
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
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
