import React from "react";
import CommentItem from "../../../../_components/CommentItem";

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
