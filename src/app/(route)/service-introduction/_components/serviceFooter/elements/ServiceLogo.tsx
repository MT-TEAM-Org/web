import React from "react";
import { cn } from "@/utils";
import DoubleLogo from "@/app/_components/icon/Service_DoubleLogo";
import Service_PlayHive from "@/app/_components/icon/Service_PlayHive";

const ServiceLogo = () => {
  return (
    <>
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
    </>
  );
};

export default ServiceLogo;
