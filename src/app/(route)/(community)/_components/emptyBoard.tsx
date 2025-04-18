"use client";

import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { usePathname, useRouter } from "next/navigation";

const EmptyBoard = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[720px] h-[248px] flex flex-col items-center justify-center mx-auto tablet:max-w-[688px] bg-gray1 text-center">
      <LogoWhite />
      <div className="flex flex-col justify-center items-center mx-auto w-full"></div>
      <div className="my-[16px]">
        <p className="font-bold text-[16px] leading-[24px text-gray7]">
          등록된 게시글이 없습니다.
        </p>
        <p className="text-[14px] leadign-[20px] text-gray7">
          이야기 나누고 싶다면 글쓰기로 소통해보세요.
        </p>
      </div>
      <button
        onClick={() => router.push(`${pathname}/write`)}
        className="flex justify-center items-center w-[120px] h-[40px] py-[13px] px-[16px] border rounded-[5px] font-bold text-[14px] text-gray7"
      >
        글쓰기
      </button>
    </div>
  );
};

export default EmptyBoard;
