import Plus from "../icon/Plus";

interface CommentMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const CommentMoreButton = ({ onClick, disabled }: CommentMoreButtonProps) => {
  return (
    <div className="flex items-center justify-center gap-[24px] min-h-[40px]">
      <div className="w-[232px] h-[2px] bg-gray1"></div>
      <button
        className="flex justify-center items-center gap-[8px] w-[160px] min-h-[40px] rounded-[5px] border-1 px-[16px] py-[10px] font-[700] text-[14px] text-gray7 whitespace-nowrap"
        onClick={onClick}
        disabled={disabled}
      >
        <Plus />
        댓글 더보기
      </button>
      <div className="w-[232px] h-[2px] bg-gray1"></div>
    </div>
  );
};

export default CommentMoreButton;
