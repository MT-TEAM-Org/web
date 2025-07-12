"use client";

import { cn } from "@/utils";
import React from "react";
import { createPortal } from "react-dom";
import { RichTextEditor } from "../editor/RichTextEditor";
import NoticeModalGroup from "./modalElements/NoticeModalGroup";
import { noticeFormFields } from "../../_constants/noticeModalFields";

const style = {
  boxStyle: "w-full flex items-center border-b border-gray2",
  labelStyle:
    "w-[100px] h-full px-3 py-2 bg-gray1 font-bold text-[14px] leading-5 text-gray8 flex items-center justify-center",
};

interface PostNoticeModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

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
        <div className="w-full h-auto border border-gray2 rounded-[5px] overflow-hidden">
          {noticeFormFields.map((field, index) => (
            <NoticeModalGroup
              key={index}
              label={field.label}
              type={field.type}
              modalStyle={style}
            />
          ))}
          <div className={cn(style.boxStyle, "h-full border-b-0")}>
            <p className={cn(style.labelStyle, "h-[344px]")}>내용</p>
            <div className="flex-1 h-[344px] px-4 py-2 bg-white flex flex-col items-center justify-center">
              <RichTextEditor placeholder="내용을 입력해주세요." />
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

export default React.memo(PostNoticeModal);
