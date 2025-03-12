import React from "react";
import Image from "next/image";

interface ServiceBenefitItemProps {
  content: string;
  imgLink: string;
  reverse?: boolean;
}

const ServiceBenefitItem = ({
  content,
  imgLink,
  reverse = false,
}: ServiceBenefitItemProps) => {
  return (
    <div
      className={`min-w-[361px] min-h-[80px] rounded-[200px] py-4 px-6 bg-[#FFFFFF] shadow-md flex justify-center items-center gap-3 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Image src={`/${imgLink}.png`} alt="" width={48} height={48} />
      <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-center text-[#181818]">
        {content}
      </p>
    </div>
  );
};

export default ServiceBenefitItem;
