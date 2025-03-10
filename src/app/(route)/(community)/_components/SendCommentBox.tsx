import usePostComment from "@/_hooks/fetcher/news/comment/usePostComment";
import Send_icon from "@/app/_components/icon/Send_icon";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SendCommentBoxProps {
  id?: string;
}

const SendCommentBox = ({ id }: SendCommentBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { mutate: newsPostComment } = usePostComment();
  const queryClient = useQueryClient();

  const handleNewsComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    newsPostComment(
      {
        newsId: id ? Number(id) : 0,
        comment: inputValue,
        imgUrl: "",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          setInputValue("");
        },
        onError: (error) => {
          console.error("댓글 추가 실패:", error);
        },
      }
    );
  };

  return (
    <div className="w-full min-h-[72px] p-4 bg-white">
      <form
        onSubmit={handleNewsComment}
        className="w-full min-h-[40px] flex gap-4 items-center justify-between"
      >
        <button
          type="button"
          className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-gray2 py-[10px] gap-[10px] bg-gray1"
        >
          <Plus />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"
          className="w-full max-w-[576px] h-[40px] rounded-[5px] border border-gray7 py-3 px-4 gap-4"
        />
        <button
          type="submit"
          className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-gray2 py-[16px] gap-[10px] bg-gray1"
        >
          <Send_icon />
        </button>
      </form>
    </div>
  );
};

export default SendCommentBox;
