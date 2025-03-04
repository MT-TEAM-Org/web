import CommentItem from "@/app/(route)/(community)/_components/CommentItem";
import React from "react";

const CommentContainer = () => {
  return (
    <div>
      {Array.from({ length: 2 }).map((_, index) => (
        <CommentItem
          key={index}
          className={index === 0 ? "bg-[#F8FDFF]" : ""}
        />
      ))}
    </div>
  );
};

export default CommentContainer;
