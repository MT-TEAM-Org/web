"use client";
import Image from "next/image";

const BannerOfBaseball = () => {
  return (
    <div className="relative w-full h-[160px] overflow-hidden mobile:hidden">
      <Image
        src="/BannerOfBaseball.png"
        alt="esportsBanner"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center 17%",
        }}
        priority
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 flex items-center tablet:ml-[90px]">
        <div className="w-full max-w-[1200px] mx-auto ">
          <p className="pc:w-[1200px] text-[#FFFFFF] text-[28px] leading-[40px] font-bold">
            야구
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerOfBaseball;
