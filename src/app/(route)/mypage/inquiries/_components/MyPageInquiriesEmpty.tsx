import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";

const MyPageInquiriesEmpty = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-[248px] rounded-b-[10px] bg-gray1",
        "mobile:h-[200px]"
      )}
    >
      <div className="flex flex-col justify-center items-center min-h-[160px] space-y-[16px]">
        <div className={cn("opacity-30", "mobile:hidden")}>
          <LogoWhite />
        </div>
        <div className="text-center space-y-[4px] min-h-[48px]">
          <h1 className="font-[700] leading-[24px] text-gray7">
            문의내역이 없습니다.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MyPageInquiriesEmpty;
