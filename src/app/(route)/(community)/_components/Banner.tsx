// _components/Banner.tsx
"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface BannerProps {
  url?: string;
}

const Banner = ({ url }: BannerProps) => {
  const pathname = usePathname();

  let bannerUrl = url;

  if (!bannerUrl) {
    const segment = pathname.split("/")[1].toLowerCase();
    console.log("segment:", segment);

    if (segment === "football") {
      bannerUrl = "soccer_banner.png";
    } else if (segment === "baseball") {
      bannerUrl = "baseball_banner.png";
    } else if (segment === "esports") {
      bannerUrl = "eSports_banner.png";
    }
  }

  return (
    <div className="w-full h-[120px] relative">
      <Image
        src={`/${bannerUrl}`}
        alt="Banner"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
};

export default Banner;
