import React from "react";
import { LogoWhite } from "./icon/LogoWhite";

const SignInModalPopUp = ({ isOpen, onClose }) => {
  const buttonBaseStyle =
    "w-[160px] h-[48px] rounded-[5px] px-5 py-4 flex gap-[10px] font-bold text-[16px]";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="w-[408px] h-[208px] rounded-[10px] p-10 flex gap-6 flex-col bg-white shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-[128px] flex flex-col gap-4">
          <LogoWhite />
          <div className="w-full h-[80px] flex flex-col gap-1">
            <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
              로그인이 필요한 서비스입니다.
            </p>
            <p className="font-medium text-[16px] leading-6 tracking-[-0.02em] text-gray6">
              회원가입을 아직 안했다면, 3초만에 회원가입으로 플레이하이브를
              즐겨보세요!
            </p>
          </div>
        </div>
        <div className="w-full h-[48px] flex gap-2">
          <button
            className={`${buttonBaseStyle} bg-white border-gray3 text=gray7`}
          >
            3초만에 회원가입
          </button>
          <button className={`${buttonBaseStyle} bg-gra text-white`}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModalPopUp;
