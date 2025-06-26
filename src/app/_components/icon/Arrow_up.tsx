import React from "react";

interface ArrowUpProps {
  size?: number;
  viewBox?: string;
}

const Arrow_up = ({ size = 20, viewBox = "0 0 15 16" }: ArrowUpProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.833252 11.3334L7.49992 4.66671L14.1666 11.3334"
      stroke="#424242"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow_up;
