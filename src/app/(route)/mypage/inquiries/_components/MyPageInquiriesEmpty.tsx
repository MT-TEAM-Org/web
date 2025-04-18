import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";

interface MyPageInquiriesEmptyProps {
  isMypage?: boolean;
}

const MyPageInquiriesEmpty = ({
  isMypage = false,
}: MyPageInquiriesEmptyProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-[248px] rounded-b-[10px] bg-gray1",
        isMypage ? "mobile:h-[500px]" : "mobile:h-[200px]"
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
              "mobile:text-[14px]"
            )}
          >
            문의내역이 없습니다.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MyPageInquiriesEmpty;
