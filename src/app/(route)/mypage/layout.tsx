import { cn } from "@/utils";
import MypageLeftSidebar from "./_components/MypageLeftSidebar";
import MobileBackButton from "./_components/MobileBackButton";

export const metadata = {
  title: "마이페이지",
  description: "마이페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-[#fafafa] min-h-[calc(100vh-476px)] pb-[40px]",
        "mobile:bg-white mobile:pb-0"
      )}
    >
      <div
        className={cn(
          "max-w-[1200px] mx-auto pt-[40px] pb-[20px]",
          "tablet:max-w-[688px]",
          "mobile:hidden"
        )}
      >
        <h1
          className="text-[28px] font-[700] leading-[40px]"
          style={{ letterSpacing: "-4%" }}
        >
          마이페이지
        </h1>
      </div>
      <div
        className={cn(
          "mt-[20px] max-w-[1200px] flex mx-auto gap-[20px]",
          "tablet:flex-col tablet:items-center tablet:gap-0",
          "mobile:mt-0 mobile:flex-col mobile:gap-0"
        )}
      >
        <MobileBackButton />
        <div
          className={cn(
            "w-[160px] min-h-[364px]",
            "tablet:w-[688px] tablet:min-h-[52px]",
            "mobile:w-full mobile:min-h-[48px] mobile:overflow-x-auto mobile:scrollbar-hide"
          )}
        >
          <div className="sticky w-max top-0">
            <MypageLeftSidebar />
          </div>
        </div>
        <div
          className={cn(
            "flex-1 w-[720px]",
            "tablet:w-[688px]",
            "mobile:w-full mobile:h-[500px]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
