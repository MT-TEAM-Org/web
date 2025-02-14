"use client";

import React, { useState, useEffect } from "react";

const ScheduleNavbar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("E스포츠");

  const onClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log("선택된 카테고리:", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-[1200px] h-full min-h-[40px] flex gap-2 items-center justify-start">
      {["E스포츠", "축구", "야구"].map((category) => (
        <button
          key={category}
          onClick={() => onClick(category)}
          className={`min-w-[77px] h-[40px] rounded-[5px] border px-4 py-[13px] flex gap-[10px] items-center justify-center font-bold text-[14px] leading-[21px] tracking-[-0.02em] cursor-pointer 
            ${
              selectedCategory === category
                ? "border border-[#424242]"
                : "border border-gray-300"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ScheduleNavbar;
