"use client";

import React, { useState } from "react";

const MenuBtn = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const btnStyle = "w-[300px] h-[52px] font-bold px-4 py-[18px] text-center";
  const activeBtnBaseStyle =
    "px-4 py-[18px] flex justify-center gap-[10px] text-center border-black";
  const passiveBtnStyle = "border-b-2 border-[#DBDBDB] text-[#A6A6A6]";

  const menuItems = ["공지사항", "개선요청", "이용약관", "개인정보 취급방침"];

  return (
    <div className="w-full min-h-[52px] h-auto flex items-center">
      {menuItems.map((item, index) => {
        let borderStyle = "";

        if (index === 0) {
          borderStyle = "border-t border-r rounded-tl-[5px] rounded-tr-[5px]";
        } else if (index === menuItems.length - 1) {
          borderStyle = "border-l border-t rounded-tr-[5px] rounded-tl-[5px]";
        } else {
          borderStyle = "border-l border-t border-r rounded-tr-[5px] rounded-tl-[5px]";
        }

        return (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${btnStyle} ${
              activeIndex === index ? `${activeBtnBaseStyle} ${borderStyle}` : passiveBtnStyle
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBtn;