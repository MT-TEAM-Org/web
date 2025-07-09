"use client";

import { cn } from "@/utils";
import React, { useState } from "react";
import PostNoticeModal from "../../_components/modal/PostNoticeModal";
import DeleteModal from "../../_components/modal/DeleteModal";

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const Page = () => {
  const [show, setShow] = useState(false);

  const button = [
    {
      name: "전체 삭제",
      value: "deleteAll",
      style: "bg-white border border-gray3 hover:bg-gray1",
    },
    {
      name: "삭제",
      value: "delete",
      style: "bg-white border border-gray3 hover:bg-gray1",
    },
    {
      name: "공지 등록",
      value: "register",
      style: "bg-Primary text-white hover:bg-primary/80",
      onClick: () => setShow(true),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
            공지 내역
          </h1>
          <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
            총 165건
          </p>
        </div>
        <div className="flex gap-2">
          {button.map((button) => (
            <button
              key={button.value}
              className={cn(buttonStyle, button.style)}
              onClick={button.onClick}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gray1">표 들어갈 부분</div>

      {/* <PostNoticeModal show={show} setShow={setShow} /> */}
      <DeleteModal show={show} setShow={setShow} />
    </div>
  );
};

export default Page;
