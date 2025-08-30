import React from "react";
import type { Metadata } from "next";
import Gnb from "../_components/_gnb/Gnb";
import MobileGnb from "../_components/_gnb/_components/MobileGnb";
import Footer from "../_components/Footer";
import { ToastContainer } from "../_components/ToastContainer";
import { GoogleAdsCustom } from "../_components/googleAds/googleAds";

export const metadata: Metadata = {
  title: { default: "Playhive", template: "Playhive - %s" },
  description: "함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!",
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Gnb />
      <MobileGnb />
      <div className="h-[280px] w-full mx-auto bg-gray-400">
        <GoogleAdsCustom clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}/>
      </div>
      <main>{children}</main>
      <Footer />
      <ToastContainer />
    </>
  );
}
