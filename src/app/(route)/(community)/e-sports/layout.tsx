import Image from "next/image";
import React from "react";
import Banner from "../_components/Banner";
import Sidebar from "../_components/Sidebar";

export const metadata = {
  title: "e스포츠 페이지",
  description: "e스포츠 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Banner url={"eSports_banner.png"} />
      <div className="mt-[20px]">
        {children}
        <Sidebar />
      </div>
    </div>
  );
}
