"use client";

import { cn } from "@/utils";
import React, { useState } from "react";

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

const ToggleButton = ({ isActive, onToggle }: ToggleButtonProps) => {
  const handleToggle = () => {
    onToggle(!isActive);
  };

  return (
    <button
      type="button"
      className={cn(
        "w-[40px] h-[24px] relative inline-flex items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
        isActive ? "bg-gra" : "bg-gray6"
      )}
      onClick={handleToggle}
      aria-label={isActive ? "비속어 필터링 켜짐" : "비속어 필터링 꺼짐"}
      aria-pressed={isActive}
    >
      <span className="sr-only">토글 버튼</span>
      <span
        className={cn(
          "w-[16px] h-[16px] absolute inline-block bg-white rounded-full transform transition-transform duration-300 ease-in-out",
          isActive ? "translate-x-[20px]" : "translate-x-1"
        )}
      />
    </button>
  );
};

export default ToggleButton;
