import React from "react";
import { cn } from "@/utils";
import BenefitsDescriptions from "./elements/BenefitsDescriptions";
import FirstBenefitItemBox from "./elementBlocks/FirstBenefitItemBox";

const FirstBenefit = () => {
  return (
    <div
      className={cn(
        "min-w-[1200px] min-h-[368px] flex justify-between items-center",
        "tablet:min-w-[688px] tablet:flex-col tablet:gap-[80px]",
        "mobile:min-w-[328px] mobile:min-h-[398px] mobile:flex-col mobile:gap-10"
      )}
    >
      <BenefitsDescriptions
        label="benefits 1"
        title="플레이하이브에서 소통한다면 다양한 즐거운 경험들을 얻어요."
        mobileTitle="플레이하이브에서 소통한다면 <br /> 다양한 즐거운 경험들을 얻어요."
        description="플레이 하이브는 유저분들의 자유롭고 즐거운 토론과 소통을 위해서
          직관적이고 커뮤니티에 집중할 수 있는 UIUX 디자인을 제공하고 있습니다.
          또한 실시간 경기중계를 보면서 함께 채팅을 나눌수 있는 경기 중계
          페이지를 통해서도 팬심을 드러내어 응원을 열심히 해보세요."
      />

      <FirstBenefitItemBox />
    </div>
  );
};

export default FirstBenefit;
