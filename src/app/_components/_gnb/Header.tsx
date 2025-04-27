"use client";

import Link from "next/link";
import { Logo } from "../icon/Logo";
import LoginButton from "./_components/LoginButton";
import { MypageButton } from "./_components/MypageButton";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useAuthStore } from "@/utils/Store";
import { useEffect } from "react";
import { cn } from "@/utils";
import useTokenRefreshOnNavigation from "@/_hooks/fetcher/sign/useTokenRefreshOnNavigation";

export default function Header() {
  const { data: userData, isSuccess, isError } = useAuthCheck();
  const isUnActive = userData?.data?.data?.status !== "ACTIVE";
  const isLogout = isError || !isSuccess;
  const { isLoggedIn, login, logout } = useAuthStore();
  useTokenRefreshOnNavigation();

  useEffect(() => {
    if (isSuccess && !isLogout && !isUnActive) {
      login();
    } else if (isSuccess && isUnActive) {
      logout();
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
      <div className="flex items-center gap-x-[16px] flex-shrink overflow-hidden">
        <Link href="/">
          <Logo />
        </Link>
        <p
          className={cn(
            "font-bold text-[16px] leading-[19.97px] text-[#00ADEE]",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            "max-w-full"
          )}
        >
          함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
        </p>
      </div>

      <div className="flex gap-x-2 h-[40px] whitespace-nowrap items-center">
        <Link href="/customer/feedback">
          <button className="flex items-center justify-center w-auto px-4 py-2  hover:text-gra tablet:p-4 tablet:w-[73.75px] ">
            개선요청
          </button>
        </Link>
        <div className="w-[1px] h-[16px] bg-gray-300 self-center my-auto " />
        <Link href="/customer">
          <button className="flex items-center justify-center w-auto px-4 py-2 hover:text-gra tablet:p-4 tablet:w-[73.75px]">
            고객센터
          </button>
        </Link>
        {isLoggedIn ? (
          <MypageButton userNickname={userData?.data?.data?.nickname} />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
