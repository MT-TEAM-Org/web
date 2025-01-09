"use client";

import { useRouter } from "next/navigation";
import { Logo } from "./icon/Logo";

export default function Header() {
  const router = useRouter();

  const headerButtonClass =
    "w-[87px] min-h-[40px] p-[10px] font-medium text-[16px] leading-[24px] text-center";

  const headerButton = [
    {
      name: "개선요청",
      link: "/improvement",
    },
    {
      name: "고객센터",
      link: "/customer",
    },
    {
      name: "로그인/회원가입",
      link: "/sign",
      buttonClass:
        "w-[124px] min-h-[40px] py-[13px] px-[16px] rounded-[5px] defaultButtonColor defaultButtonColor:hover text-white font-bold text-[14px] leading-[14px]",
    },
  ];
  return (
    <div className="w-full max-w-[1200px] min-h-[64px] mx-auto flex justify-between items-center">
      <div className="flex max-w-[476.74px] items-center gap-4">
        <h1 onClick={() => router.push("/")} className="">
          <Logo />
        </h1>
        <p className="font-bold max-w-[325px] min-h-[12px] text-[16px] leading-[19.97px] text-[#00ADEE] whitespace-nowrap">
          모두 함께 즐기는 클린 스포츠 커뮤니티 플레이 하이브!
        </p>
      </div>
      <div className="flex max-w-[323px] min-h-[40px] items-center">
        {headerButton.map((item, index) => (
          <button
            key={index}
            className={item.buttonClass ? item.buttonClass : headerButtonClass}
            onClick={() => router.push(item?.link)}
          >
            {item?.name}
          </button>
        ))}
      </div>
    </div>
  );
}
