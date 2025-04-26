"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Logo } from "./icon/Logo";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import CustomIcon from "./IconComponents";

const SignInModalPopUp = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const buttonBaseStyle =
    "w-[160px] h-[48px] rounded-[5px] px-5 py-4 flex gap-[10px] items-center justify-center font-bold text-[16px] whitespace-nowrap mobile:w-[136px] mobile:h-[40px]";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "w-[408px] h-[280px] rounded-[10px] p-10 flex gap-6 flex-col items-center justify-center text-center bg-white shadow-sm",
          "mobile:w-[328px] mobile:h-[238px] mobile:p-2"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "w-full h-[128px] flex flex-col gap-4 items-center justify-center",
            "mobile:h-[126px]"
          )}
        >
          {!isMobile ? (
            <Logo />
          ) : (
            <div className="flex gap-[3px] items-center">
              <CustomIcon
                icon="MOBILE_LOGO"
                className={cn("h-[30px]", "text-white")}
              />
              <CustomIcon
                icon="MOBILE_PLAYHIVE"
                className={cn("h-[24px]", "text-white")}
              />
            </div>
          )}
          <div
            className={cn(
              "w-full h-[80px] flex flex-col gap-1",
              "mobile:h-[78px]"
            )}
          >
            <p
              className={cn(
                "font-bold text-[18px] leading-7 tracking-[-0.04em] text-black",
                "mobile:text-[16px] mobile:leading-[26px] mobile:tracking-[-0.02em]"
              )}
            >
              로그인이 필요한 서비스입니다.
            </p>
            <p className="font-medium text-[16px] leading-6 tracking-[-0.02em] text-center text-gray6">
              회원가입을 아직 안했다면, 3초만에 회원가입으로 <br />{" "}
              플레이하이브를 즐겨보세요!
            </p>
          </div>
        </div>
        <div
          className={cn(
            "w-full h-[48px] flex gap-2 items-center justify-center",
            "mobile:h-[40px]"
          )}
        >
          <button
            onClick={onClose}
            className={`${buttonBaseStyle} bg-white border border-gray3 text-gray7`}
          >
            닫기
          </button>
          <Link href="/sign">
            <button className={`${buttonBaseStyle} bg-gra text-white`}>
              로그인/회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SignInModalPopUp;
