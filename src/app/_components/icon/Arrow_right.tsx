import React from "react";

interface SingleArrowIconRightProps {
  width?: string;
  height?: string;
}

const SingleArrowIconRight = ({
  width = "14",
  height = "14px",
}: SingleArrowIconRightProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.375 13L10.375 7L4.375 1"
        stroke="#656565"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SingleArrowIconRight;
