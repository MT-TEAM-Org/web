import React from "react";

interface XIconProps {
  className?: string;
  stroke?: string;
  width?: number;
  height?: number;
}

const Cancel_icon = ({
  className = "",
  stroke = "white",
  width = 10,
  height = 10,
}: XIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      className={className}
    >
      <path
        d="M1.66602 1.66699L8.33268 8.33366M8.33268 1.66699L1.66602 8.33366"
        stroke={stroke}
        strokeWidth="1.10833"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Cancel_icon;
