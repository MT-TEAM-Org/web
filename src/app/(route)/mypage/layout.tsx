import { cn } from "@/utils";
import MypageLeftSidebar from "./_components/MypageLeftSidebar";

export const metadata = {
  title: "PlayHive 마이페이지",
  description: "PlayHive 마이페이지입니다.",
  openGraph: {
    title: "PlayHive 마이페이지",
    description: "PlayHive 마이페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "마이페이지", "내정보"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-[#fafafa] min-h-[calc(100vh-476px)] pb-[40px]",
        "tablet:pb-0",
        "mobile:bg-white mobile:pb-0 mobile:min-h-[calc(100vh-450.67px)]"
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
          "mt-[20px] max-w-[1200px] flex mx-auto gap-[16px]",
          "tablet:w-full tablet:flex-col tablet:items-center tablet:gap-0",
          "mobile:w-full mobile:mt-0 mobile:flex-col mobile:gap-0"
        )}
      >
        <div
          className={cn(
            "w-[160px] min-h-[364px]",
            "tablet:w-[688px] tablet:min-h-[52px]",
            "mobile:w-full mobile:min-h-[48px] mobile:overflow-x-auto mobile:scrollbar-hide mobile:mt-[48px]"
          )}
        >
          <div className="sticky w-max top-0">
            <MypageLeftSidebar />
          </div>
        </div>
        <div
          className={cn(
            "w-[720px]",
            "tablet:w-[688px]",
            "mobile:min-h-[500px] mobile:w-full"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
