"use client";

import { useRouter } from "next/navigation";
import { Logo } from "./icon/Logo";

export default function Header() {
  const router = useRouter();

  const headerButtonClass =
    "font-medium text-[17px] list-none pointer cursor-pointer px-2 mr-1";

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
      link: "/login",
      buttonClass:
        "font-medium text-[17px] list-none pointer cursor-pointer px-2 bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md font-semibold",
    },
  ];
  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 flex items-center">
      <div className="flex w-1/2 items-center">
        <h1 onClick={() => router.push("/")} className="font-bold text-[25px]">
          <Logo />
        </h1>
        <p className="ml-3 font-semibold text-[13px] text-blue-400">
          모두 함께 즐기는 클린 스포츠 커뮤니티 플레이 하이브!
        </p>
      </div>
      <div className="flex justify-end w-1/2">
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
