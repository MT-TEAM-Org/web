import React from "react";
import Image from "next/image";

const ServiceAnimation = () => {
  return (
    <div className="absolute overflow-hidden w-full h-[140px]">
      <div className="flex gap-[60px] w-max animate-marquee">
        {[...Array(6)].map((_, index) => (
          <React.Fragment key={index}>
            <Image
              src="/Service_animation1.png"
              alt="서비스소개 이미지"
              width={1227}
              height={140}
              priority
            />
            <Image
              src="/Service_animation2.png"
              alt="서비스소개 이미지"
              width={2134}
              height={140}
              priority
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ServiceAnimation;
