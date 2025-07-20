import React from "react";
import { cn } from "@/utils";
import MatchMobileGnb from "../matchBroadcast/_components/matchGnb/MatchMobileGnb";
import ServiceAnimation from "./_components/hero/ServiceAnimation";
import ServiceMainBox from "./_components/hero/ServiceMainBox";
import ServiceFeatures from "./_components/features/ServiceFeatures";
import FirstBenefit from "./_components/benefits/FirstBenefit";
import SecondBenefit from "./_components/benefits/SecondBenefit";
import ServiceFooter from "./_components/serviceFooter/ServiceFooter";

const Page = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* mobile header */}
      <MatchMobileGnb type="service" />

      {/* hero */}
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

      {/* footer */}
      <ServiceFooter />
    </div>
  );
};

export default Page;
