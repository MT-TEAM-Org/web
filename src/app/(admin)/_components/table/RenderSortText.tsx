import React from "react";

const RenderSortText = (getSortText: () => string | null) => {
  const sortText = getSortText();
  if (!sortText) return null;

  return (
    <p className="font-bold text-[14px] leading-5 text-Primary">{sortText}</p>
  );
};

export default RenderSortText;
