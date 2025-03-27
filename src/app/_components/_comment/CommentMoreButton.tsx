import Plus from "../icon/Plus";

interface CommentMoreButtonProps {
  boardId?: number;
  page?: number;
  setPage?: (page: number) => void;
}

const CommentMoreButton = ({
  boardId,
  page,
  setPage,
}: CommentMoreButtonProps) => {
  return (
    <div className="flex items-center gap-[24px] min-h-[40px]">
      <div className="w-[232px] h-[2px] bg-gray1"></div>
      <button className="flex justify-center items-center gap-[8px] w-[160px] min-h-[40px] rounded-[5px] border-1 px-[16px] py-[10px] font-[700] text-[14px] text-gray7">
        <Plus />
        댓글 더보기
      </button>
      <div className="w-[232px] h-[2px] bg-gray1"></div>
    </div>
  );
};

export default CommentMoreButton;
