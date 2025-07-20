import React from "react";
import MatchMobileGnb from "../matchBroadcast/_components/matchGnb/MatchMobileGnb";
import ServiceFeatures from "./_components/features/ServiceFeatures";
import ServiceFooter from "./_components/serviceFooter/ServiceFooter";
import BenefitsBox from "./_components/benefits/BenefitsBox";
import ServiceHeroBox from "./_components/hero/ServiceHeroBox";

const Page = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* mobile header */}
      <MatchMobileGnb type="service" />

      {/* hero */}
      <ServiceHeroBox />

      {/* features */}
      <ServiceFeatures />

      {/* benefits */}
      <BenefitsBox />

      {/* footer */}
      <ServiceFooter />
    </div>
  );
};

export default Page;
