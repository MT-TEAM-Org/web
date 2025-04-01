import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import React from "react";
import { Plus } from "lucide-react";
import CommentItem from "../../_components/CommentItem";

const CommentBox = () => {
  return (
    <div className="w-full max-w-[800px] flex flex-col">
      <CommentBar />
      <div className="w-full h-auto">
        <CommentItem bestComment={true} />
        <CommentItem
          bestComment={true}
          data={{ commentImg: "/Fake_comment_img.png" }}
        />
        <CommentItem
          bestComment={true}
          data={{ nestedComments: "@댓글유저디자인이렇게" }}
        />
        <CommentItem />
        {/* <ReplyCommentItem /> */}
        <CommentItem />
        <CommentItem data={{ commentImg: "/Fake_comment_img.png" }} />
        {/* <EmptyComment /> */}
      </div>
      <div className="flex items-center justify-center">
        <button className="w-[160px] min-h-[40px] rounded-[5px] border px-4 py-[10px] flex gap-2 justify-center items-center font-bold text-[14px] leading-[14px] border-gray3 bg-gray1 text-gray7 cursor-pointer">
          <Plus />
          댓글 더보기
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
