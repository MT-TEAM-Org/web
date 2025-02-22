import React from "react";

interface ArrowIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const Arrow_reply = ({
  className = "",
  color = "#CBCBCB",
  size = 18,
}: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M12.5 4L17 8.5L12.5 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 1V8.5H16.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow_reply;
