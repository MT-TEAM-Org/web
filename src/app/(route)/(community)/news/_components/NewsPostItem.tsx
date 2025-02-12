"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NewsPostItem = () => {
  const router = useRouter();

  const handleToPage = () => {
    router.push("/schedule/info");
  };

  return (
    <div
      className="w-[720px] h-[116px] flex justify-start gap-3 border-b border-[#FAFAFA] p-3 bg-[#FFFFFF] cursor-pointer"
      onClick={handleToPage}
    >
      <Image
        src="/NewsItem_fake.png"
        alt="news img"
        width={160}
        height={92}
        className="w-[160px] h-[92px] gap-[10px] rounded-[5px]"
      />

      <div className="min-w-[524px] min-h-[24px] h-auto flex flex-col gap-1">
        <div className="w-full h-auto flex justify-center items-center gap-[2px]">
          <h1 className="font-[700] text-[16px] leading-6 tracking-[-2%]">
            “올해도 라인 스와프 나옵니다”“올해도 라인 스와프 나옵니다”“올해도
            라인..
          </h1>
          <p className="font-[500] text-[14px] leading-5 text-[#00ADEE]">
            [24]
          </p>
          <p className="font-[900] text-[10px] leading-[18px] text-[#00ADEE] flex justify-center align-center">
            N
          </p>
        </div>
        <div>
          <p className="font-[500] text-[14px] leading-5 text-[#424242]">
            탑라이너들은 올해도 바텀 1차 포탑에서 의연하게 다이브를 받아들여야
            한다.2024시즌을 상징하는 전략 중 하나는 라인 스...
          </p>
        </div>
        <div className="flex gap-1 font-[500] text-[12px] leading-[18px] tracking-[-2%] text-[#A6A6A6]">
          <p>축구</p>
          <p>1분전</p>
          <p>네이버 스포츠</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPostItem;
