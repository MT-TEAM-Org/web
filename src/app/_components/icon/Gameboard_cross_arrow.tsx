import React from "react";

interface BidirectionalArrowProps {
  className?: string;
  width?: number;
  height?: number;
  upArrowColor?: string;
  downArrowColor?: string;
}

const Gameboard_cross_arrow = ({
  className = "",
  width = 16,
  height = 16,
  upArrowColor = "#00ADEE",
  downArrowColor = "#D1504B",
}: BidirectionalArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M5.06797 2.66699V13.467M5.06797 2.66699L7.46797 5.06699M5.06797 2.66699L2.66797 5.06699"
        stroke={upArrowColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9332 13.467V2.66699M10.9332 13.467L13.3332 11.067M10.9332 13.467L8.5332 11.067"
        stroke={downArrowColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Gameboard_cross_arrow;
