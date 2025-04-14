import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import Link from "next/link";

interface MyPagePostEmptyProps {
  width?: string;
  height?: string;
}

const MyPagePostEmpty = ({
  width = "w-full",
  height = "h-[248px]",
}: MyPagePostEmptyProps) => {
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} rounded-b-[10px] bg-gray1`}
    >
      <div className="flex flex-col justify-center items-center min-h-[160px] space-y-[16px]">
        <div className="opacity-30">
          <LogoWhite />
        </div>
        <div className="text-center space-y-[4px] min-h-[48px]">
          <h1 className="font-[700] leading-[24px] text-gray7">
            등록된 게시글이 없습니다.
          </h1>
          <p className="text-[14px] leading-[20px] text-gray7">
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
