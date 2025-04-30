"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BannerOfFootball from "./bannerOfFootball";
import BannerOfBaseball from "./bannerOfBaseball";
import BannerOfEsports from "./bannerOfEsports";

const Banner = () => {
  const pathname = usePathname();
  const segment = pathname.split("/")[2]?.toLowerCase() || "";

  switch (segment) {
    case "football":
      return <BannerOfFootball />;
    case "baseball":
      return <BannerOfBaseball />;
    case "esports":
      return <BannerOfEsports />;
    default:
      return null;
  }
};

export default Banner;
