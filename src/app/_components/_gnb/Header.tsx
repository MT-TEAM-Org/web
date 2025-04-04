"use client";

import Link from "next/link";
import { Logo } from "../icon/Logo";
import LoginButton from "./_components/LoginButton";
import { MypageButton } from "./_components/MypageButton";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useAuthStore } from "@/utils/Store";
import { useEffect } from "react";
import { cn } from "@/utils";

export default function Header() {
  const { data: userData, isSuccess, isError } = useAuthCheck();
  const isLogout = isError || !isSuccess;
  const { isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (isSuccess && !isLogout) {
      login();
    }
  }, [isSuccess]);

  const headerButtonClass =
    "w-[87px] min-h-[40px] p-[10px] font-medium text-[16px] leading-[24px] text-center";

  const headerButton = [
    {
      name: "개선요청",
      link: "/customer/feedback",
    },
    {
      name: "고객센터",
      link: "/customer",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] min-h-[64px] mx-auto flex justify-between items-center">
      <div className="flex max-w-[476.74px] items-center gap-x-[16px]">
        <Link href="/">
          <Logo />
        </Link>
        <p className="font-bold max-w-[325px] min-h-[12px] text-[16px] leading-[19.97px] text-[#00ADEE] whitespace-nowrap">
          함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
        </p>
      </div>
      <div className="flex justify-center max-w-[323px] min-h-[40px] items-center whitespace-nowrap">
        <div className="flex tablet:gap-x-[8px]">
          {/* 개선요청 버튼 */}
          <Link href={headerButton[0].link}>
            <button className={cn(`${headerButtonClass}`)}>
              {headerButton[0].name}
            </button>
          </Link>
          <div className="flex items-center">
            <div className="w-[1px] h-[16px] border border-gray2"></div>
          </div>
          <div className="">
            <Link href={headerButton[1].link}>
              <button className={cn(`${headerButtonClass}`)}>
                {headerButton[1].name}
              </button>
            </Link>
          </div>
        </div>

        {/* 로그인/마이페이지 버튼 */}
        {isLoggedIn ? (
          <MypageButton userNickname={userData?.data?.data?.nickname} />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
