import React from "react";
import Image from "next/image";

const ServiceAnimation = () => {
  return (
    <div className="absolute overflow-hidden w-full h-[140px]">
      <div className="flex w-[8528px] scroll-x-animation gap-[60px]">
        <Image
          src="/Service_animation1.png"
          alt="서비스소개 이미지"
          width={1227}
          height={140}
        />
        <Image
          src="/Service_animation2.png"
          alt="서비스소개 이미지"
          width={2134}
          height={140}
        />
        <Image
          src="/Service_animation1.png"
          alt="서비스소개 이미지"
          width={1227}
          height={140}
        />
        <Image
          src="/Service_animation2.png"
          alt="서비스소개 이미지"
          width={2134}
          height={140}
        />
      </div>
    </div>
  );
};

export default ServiceAnimation;
