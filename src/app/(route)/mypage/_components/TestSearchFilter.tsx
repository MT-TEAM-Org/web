"use client";

import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import { useState } from "react";

const options = ["제목+내용", "제목", "내용", "댓글", "작성자"];

const textStyle = "font-[500] text-[14px] leading-[20px] text-black";

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left w-[120px]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 버튼 */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "w-full border rounded-[5px] px-4 py-2 bg-[#FFFFFF] flex justify-between items-center gap-2 text-nowrap",
          isOpen
            ? "border-black border-b-0 rounded-b-none"
            : "border-[#DBDBDB] hover:border-black"
        )}
      >
        <span className={textStyle}>{selected}</span>
        {isOpen ? (
          <Icon icon="SELECT_ARROW_DOWN" />
        ) : (
          <Icon icon="SELECT_ARROW_UP" />
        )}
      </button>

      {/* 구분선 */}
      {isOpen && (
        <div className="relative w-full h-[1px]">
          <hr className="border-[#DBDBDB]" />
          <div className="absolute top-0 left-0 w-[1px] h-px bg-black" />
          <div className="absolute top-0 right-0 w-[1px] h-px bg-black" />
        </div>
      )}

      {/* 드롭다운 목록 */}
      {isOpen && (
        <ul
          className={cn(
            "absolute w-full bg-[#FFFFFF] border border-t-0 rounded-[5px] rounded-t-none shadow-lg z-10 border-black"
          )}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={cn(
                "w-full h-[40px] px-4 py-2 hover:bg-gray-100 cursor-pointer",
                textStyle
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
