import { LogoWhite } from "@/app/_components/icon/LogoWhite";

const CommentEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-[16px] min-h-[184px] py-[40px] bg-gray1 rounded-b-[5px]">
      <div className="opacity-30">
        <LogoWhite />
      </div>
      <div className="flex flex-col items-center gap-[4px] text-gray7">
        <p className="font-[700] leading-[24px]">등록된 댓글이 없습니다.</p>
        <p className="text-[14px] leading-[20px]">
          이야기 나누고 싶다면 댓글을 남겨보세요.
        </p>
      </div>
    </div>
  );
};

export default CommentEmpty;
