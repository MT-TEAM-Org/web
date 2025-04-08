import React from "react";

interface ArrowLeftProps {
  width?: string | number;
  height?: string | number;
}

const Arrow_left = ({ width = 14, height = 14 }: ArrowLeftProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.625 13L3.625 7L9.625 1"
        stroke="#656565"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow_left;
