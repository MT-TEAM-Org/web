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
      className={`min-w-[361px] min-h-[80px] rounded-[200px] py-4 px-6 bg-white shadow-md flex justify-center items-center gap-3 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Image
        src={`/${imgLink}.png`}
        alt="service img"
        width={48}
        height={48}
        className="w-[48px] h-[48px]"
      />
      <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-center text-gray9">
        {content}
      </p>
    </div>
  );
};

export default ServiceBenefitItem;
