import React from "react";
import { cn } from "@/utils";

interface BenefitsDescriptionsProps {
  label: string;
  title: string;
  mobileTitle: string;
  description: string;
}

const BenefitsDescriptions = ({
  label,
  title,
  mobileTitle,
  description,
}: BenefitsDescriptionsProps) => {
  return (
    <div
      className={cn(
        "w-[560px] min-h-[294px] flex gap-6 flex-col",
        "tablet:w-full",
        "mobile:w-full mobile:min-h-[166px] mobile:h-auto mobile:gap-2"
      )}
    >
      <div
        className={cn(
          "w-full h-[158px] flex gap-1 flex-col",
          "mobile:h-0 mobile:min-h-[70px]"
        )}
      >
        <p
          className={cn(
            "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-gra",
            "mobile:text-[12px] mobile:leading-[18px]"
          )}
        >
          benefits 2
        </p>
        <p
          className={cn(
            "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
            "tablet:hidden",
            "mobile:hidden"
          )}
        >
          좋아하는 스포츠 선수를 함께 응원한다면 더 즐거워요!
        </p>
        <p
          className={cn(
            "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
            "mobile:text-[16px] mobile:leading-6",
            "pc:hidden"
          )}
        >
          좋아하는 스포츠 선수를 함께 <br /> 응원한다면 더 즐거워요!
        </p>
      </div>
      <p
        className={cn(
          "font-medium text-[18px] leading-7 tracking-[-0.04em] text-gray7",
          "mobile:text-[12px] mobile:leading-[18px]"
        )}
      >
        페이커, 손흥민, 오타니, T1, 젠지, 토트넘 등.. 좋아하는 팀이나 선수가
        있으신가요?
        <br /> 추천시스템을 통해서 서로를 존중해주는 응원 문화를 지향합니다.
        따라서 팬인 선수나 팀에 대한 정보 공유, 응원 게시글 등을 통하여 다양한
        지식을 넓히고 쌓아갈 수 있습니다. 이른 바 덕업일치 실현을 해볼 때
        입니다.
      </p>
    </div>
  );
};

export default BenefitsDescriptions;
