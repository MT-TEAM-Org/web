import React from "react";
import { cn } from "@/utils";
import { benefitImages } from "../../_constants/BENEFIT_IMAGES";
import Image from "next/image";
import BenefitsDescriptions from "./elements/BenefitsDescriptions";

const SecondBenefit = () => {
  return (
    <div
      className={cn(
        "w-[1200px] min-h-[480px] flex justify-between items-center",
        "tablet:w-full tablet:min-h-[854px] tablet:flex-col tablet:gap-[80px]",
        "mobile:w-full mobile:min-h-[571px] mobile:flex-col mobile:gap-10"
      )}
    >
      <div
        className={cn(
          "relative w-[464.42px] h-[480px] flex items-center justify-center",
          "mobile:w-[296px] h-[305px]"
        )}
      >
        {benefitImages.map((image, index) => (
          <div key={index} className={image.shadowClass}>
            <Image
              src={image.src}
              alt="Service benefit2 img"
              width={image.width}
              height={image.height}
              className={`${image.className} ${image.zIndex}`}
            />
          </div>
        ))}
      </div>

      <BenefitsDescriptions
        label="benefits 2"
        title="좋아하는 스포츠 선수를 함께 응원한다면 더 즐거워요!"
        mobileTitle="좋아하는 스포츠 선수를 함께 응원한다면 더 즐거워요!"
        description="페이커, 손흥민, 오타니, T1, 젠지, 토트넘 등.. 좋아하는 팀이나 선수가
          있으신가요?
          <br /> 추천시스템을 통해서 서로를 존중해주는 응원 문화를 지향합니다.
          따라서 팬인 선수나 팀에 대한 정보 공유, 응원 게시글 등을 통하여 다양한
          지식을 넓히고 쌓아갈 수 있습니다. 이른 바 덕업일치 실현을 해볼 때
          입니다."
      />
    </div>
  );
};

export default SecondBenefit;
