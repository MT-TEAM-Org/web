import React from "react";
import Image from "next/image";

type ImageType = {
  src: string;
  width: number;
  height: number;
  className: string;
  zIndex: string;
  shadowClass: string;
};

interface SecondServiceBenefitItemProps {
  image: ImageType;
}

const SecondServiceBenefitItem = ({ image }: SecondServiceBenefitItemProps) => {
  return (
    <div className={image.shadowClass}>
      <Image
        src={image.src}
        alt="Service benefit2 img"
        width={image.width}
        height={image.height}
        className={`${image.className} ${image.zIndex}`}
      />
    </div>
  );
};

export default SecondServiceBenefitItem;
