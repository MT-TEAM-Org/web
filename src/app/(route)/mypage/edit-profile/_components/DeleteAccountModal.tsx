"use client";

import React, { useEffect } from "react";
import { Logo } from "@/app/_components/icon/Logo";
import { createPortal } from "react-dom";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, isPending }) => {
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
    "w-[160px] h-[48px] rounded-[5px] px-5 py-4 flex gap-[10px] items-center justify-center font-bold leading-[1]";
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="w-[408px] min-h-[304px] rounded-[10px] p-10 flex gap-6 flex-col items-center justify-center text-center bg-white shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full min-h-[152px] flex flex-col gap-4 items-center justify-center">
          <Logo />
          <div className="w-full min-h-[104px] flex flex-col gap-1">
            <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
              정말 회원탈퇴 하시겠습니까?
            </p>
            <p className="leading-6 tracking-[-0.02em] text-gray6">
              개인정보 취급방침에 따라 회원님께서 작성하신
              <br /> 게시글, 댓글 등 모든 활동 자료는 일괄 삭제됩니다.
              <br /> 그래도 탈퇴하시겠습니까?
            </p>
          </div>
        </div>
        <div className="w-full h-[48px] flex gap-2">
          <button
            onClick={onConfirm}
            className={`${buttonBaseStyle} bg-white border border-gray3 text-gray7`}
            disabled={isPending}
          >
            네, 탈퇴할게요
          </button>
          <button
            className={`${buttonBaseStyle} bg-gra text-white text-nowrap`}
            onClick={onClose}
          >
            아니요, 더 이용할래요
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteAccountModal;
