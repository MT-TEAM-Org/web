"use client";

import React, { useState } from "react";

interface ScheduleNavbarProps {
  setSelectedCategory: (category: string) => void;
}

const ScheduleNavbar = ({ setSelectedCategory }: ScheduleNavbarProps) => {
  const [selectedCategory, setSelectedCategoryState] = useState("E스포츠");

  const onClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedCategoryState(category);
  };

  return (
    <div className="w-[1200px] h-full min-h-[40px] flex gap-2 items-center justify-start">
      {["E스포츠", "축구", "야구"].map((category) => (
        <button
          key={category}
          onClick={() => onClick(category)}
          className={`min-w-[77px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] items-center justify-center font-bold text-[14px] leading-[21px] tracking-[-0.02em] cursor-pointer ${
            selectedCategory === category
              ? "border border-[#424242]"
              : "border border-[#DBDBDB]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ScheduleNavbar;
