import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";
import Link from "next/link";

interface MyPagePostEmptyProps {
  width?: string;
  height?: string;
  isHome?: boolean;
}

const MyPagePostEmpty = ({
  width = "w-full",
  height = "h-[248px]",
  isHome = false,
}: MyPagePostEmptyProps) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center ${width} ${height} rounded-b-[10px] bg-gray1`,
        `${isHome ? "mobile:h-[178px]" : `mobile:h-[${height}]`}`
      )}
    >
      <div className="flex flex-col justify-center items-center min-h-[160px] space-y-[16px]">
        <div className={cn("opacity-30", "mobile:hidden")}>
          <LogoWhite />
        </div>
        <div className="text-center space-y-[4px] min-h-[48px]">
          <h1
            className={cn(
              "font-[700] leading-[24px] text-gray7",
              `${isHome ? "mobile:text-[12px]" : "mobile:text-[14px]"}`
            )}
          >
            등록된 게시글이 없습니다.
          </h1>
          <p
            className={cn(
              "text-[14px] leading-[20px] text-gray7",
              `${isHome ? "mobile:text-[12px]" : "mobile:text-[14px]"}`
            )}
          >
            이야기 나누고 싶다면 글쓰기로 소통해보세요.
          </p>
        </div>
        <Link href="/board/esports/ALL/write">
          <button className="w-[120px] min-h-[40px] rounded-[5px] border-1 border-[#DBDBDB] px-[16px] py-[13px] bg-white font-[700] text-[14px] leading-[14px] text-gray7">
            글쓰기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyPagePostEmpty;
