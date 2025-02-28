"use client";

import React, { useState } from "react";

const ToggleButton = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      type="button"
      className={`w-[40px] h-[24px] relative inline-flex items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
        isActive ? "bg-[#00ADEE]" : "bg-[#656565]"
      }`}
      onClick={handleToggle}
      aria-pressed={isActive}
    >
      <span className="sr-only">토글 버튼</span>
      <span
        className={`w-[16px] h-[16px] absolute inline-block bg-white rounded-full transform transition-transform duration-300 ease-in-out ${
          isActive ? "translate-x-[20px]" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleButton;
