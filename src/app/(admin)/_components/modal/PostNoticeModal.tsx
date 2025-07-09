"use client";

import { cn } from "@/utils";
import React from "react";
import { createPortal } from "react-dom";

interface PostNoticeModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const boxStyle = "w-full flex items-center border-b border-gray2";
const labelStyle =
  "w-[100px] h-full px-3 py-2 bg-gray1 font-bold text-[14px] leading-5 text-gray8 flex items-center justify-center";
const inputStyle =
  "flex-1 px-4 py-2 bg-white text-[14px] leading-5 text-gray8 border border-x-0 border-gray2";

const PostNoticeModal = ({ show, setShow }: PostNoticeModalProps) => {
  if (!show) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShow(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleClickOutside}
    >
      <form
        action=""
        className="w-[800px] min-h-[670px] rounded-[10px] p-6 bg-white flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          공지사항 등록
        </h3>
        <div className="w-full h-auto border border-gray2">
          <div className={cn(boxStyle, "h-[40px]")}>
            <p className={labelStyle}>작성자</p>
            <p className="flex-1 h-full px-4 py-2 bg-white text-[14px] leading-5 text-gray8">
              플레이하이브 관리자
            </p>
          </div>
          <div className={cn(boxStyle, "h-[56px]")}>
            <p className={labelStyle}>제목</p>
            <div className={inputStyle}>
              <input
                type="text"
                placeholder="내용을 입력해주세요"
                className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
              />
            </div>
          </div>
          <div className={cn(boxStyle, "h-[56px]")}>
            <p className={labelStyle}>첨부링크</p>
            <div className={inputStyle}>
              <input
                type="text"
                placeholder="내용을 입력해주세요"
                className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
              />
            </div>
          </div>
          <div className={cn(boxStyle, "h-full")}>
            <p className={cn(labelStyle, "h-[344px]")}>내용</p>
            <div className="flex-1 h-[344px] px-4 py-2 bg-white flex flex-col items-center justify-center">
              <div className="w-full h-[44px] bg-gray5 flex items-center justify-center">
                팁탭 들어갈 부분
              </div>
              <textarea
                name=""
                id=""
                className="w-full flex-1 h-[284px] rounded-[5px] rounded-t-none border border-t-0 border-gray3 px-4 py-3 resize-none text-[14px] leading-[22px] tracking-[-0.02em] placeholder:text-gray5 placeholder:font-normal"
                placeholder="내용을 입력해주세요"
              ></textarea>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex items-center justify-center bg-gra font-bold text-[14px] text-white"
        >
          등록
        </button>
      </form>
    </div>,
    document.body
  );
};

export default PostNoticeModal;
