import React from "react";
import DoubleLogo from "@/app/_components/icon/Service_DoubleLogo";
import Service_PlayHive from "@/app/_components/icon/Service_PlayHive";
import Link from "next/link";
import { cn } from "@/utils";
import MatchMobileGnb from "../matchBroadcast/_components/matchGnb/MatchMobileGnb";
import ServiceAnimation from "./_components/hero/ServiceAnimation";
import ServiceMainBox from "./_components/hero/ServiceMainBox";
import ServiceFeatures from "./_components/features/ServiceFeatures";
import FirstBenefit from "./_components/benefits/FirstBenefit";
import SecondBenefit from "./_components/benefits/SecondBenefit";

const Page = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <MatchMobileGnb type="service" />
      <div
        className={cn(
          "w-full h-[480px] flex items-center justify-center bg-gradient-to-r from-gra to-[#006388]",
          "mobile:h-[236px]"
        )}
      >
        <ServiceAnimation />
        <ServiceMainBox />
      </div>

      {/* features */}
      <ServiceFeatures />

      {/* benefits */}
      <div
        className={cn(
          "w-full min-h-[488px] py-[60px] flex gap-[10px] items-center justify-center bg-bg0",
          "tablet:min-h-[834px] tablet:px-[40px]",
          "mobile:min-h-[446px] mobile:px-4 mobile:py-6"
        )}
      >
        <FirstBenefit />
      </div>

      <div
        className={cn(
          "w-full min-h-[600px] py-[60px] flex gap-[10px] bg-white items-center justify-center",
          "tablet:min-h-[974px] tablet:flex-col tablet:px-[40px]",
          "mobile:min-h-[619px] mobile:flex-col mobile:px-4 mobile:py-6"
        )}
      >
        <SecondBenefit />
      </div>

      <div
        className={cn(
          "w-full h-[360px] flex items-center justify-center bg-[url('/Service_footer.png')] bg-center bg-cover relative",
          "mobile:h-[200px]"
        )}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div
          className={cn(
            "min-w-[558px] min-h-[232px] flex gap-6 flex-col items-center justify-center relative z-10",
            "tablet:min-w-[561px]",
            "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-4"
          )}
        >
          <div
            className={cn(
              "min-w-[558px] min-h-[156px] flex flex-col items-center justify-center gap-6",
              "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-2"
            )}
          >
            <div
              className={cn(
                "min-h-[80px] flex items-center gap-[10px]",
                "mobile:hidden"
              )}
            >
              <DoubleLogo strokeWidth={0.1} />
              <Service_PlayHive />
            </div>
            <div
              className={cn(
                "min-h-[32px] flex items-center gap-1",
                "pc:hidden",
                "tablet:hidden"
              )}
            >
              <DoubleLogo width={20} height={27} strokeWidth={0.1} />
              <Service_PlayHive width={93} height={32} />
            </div>
            <p
              className={cn(
                "font-bold text-[36px] leading-[52px] tracking-[-0.02em] text-white",
                "mobile:text-[16px] mobile:leading-6"
              )}
            >
              &quot;여러분의 스포츠 이야기를 들려주세요!”
            </p>
          </div>
          <Link href={"/sign"}>
            <button
              className={cn(
                "w-[160px] h-[52px] rounded-[5px] px-[22px] py-[18px] flex gap-[10px] bg-gra text-white items-center justify-center",
                "mobile:w-[120px] mobile:h-[40px] mobile:text-[14px] mobile:whitespace-nowrap"
              )}
            >
              로그인/회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
