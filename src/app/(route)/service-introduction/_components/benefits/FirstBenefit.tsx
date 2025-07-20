import React from "react";
import { cn } from "@/utils";
import { serviceBenefits } from "../../_constants/SERVICE_BENEFITS";
import ServiceBenefitItem from "./ServiceBenefitItem";

const FirstBenefit = () => {
  return (
    <div
      className={cn(
        "min-w-[1200px] min-h-[368px] flex justify-between items-center",
        "tablet:min-w-[688px] tablet:flex-col tablet:gap-[80px]",
        "mobile:min-w-[328px] mobile:min-h-[398px] mobile:flex-col mobile:gap-10"
      )}
    >
      <div
        className={cn(
          "w-[560px] min-h-[294px] flex gap-6 flex-col",
          "tablet:w-full tablet:min-h-[158px] tablet:order-2",
          "mobile:w-full mobile:min-h-[150px] mobile:order-2 mobile:gap-2"
        )}
      >
        <div
          className={cn(
            "w-full h-[158px] flex flex-col gap-1 font-bold tracking-[-0.02em]",
            "mobile:min-h-[70px] mobile:h-0"
          )}
        >
          <p
            className={cn(
              "text-[20px] leading-[26px] text-gra",
              "mobile:text-[12px] mobile:leading-[18px]"
            )}
          >
            benefits 1
          </p>
          <p
            className={cn(
              "text-[42px] leading-[64px] text-black",
              "tablet:hidden",
              "mobile:hidden"
            )}
          >
            플레이하이브에서 소통한다면 다양한 즐거운 경험들을 얻어요.
          </p>
          <p
            className={cn(
              "tablet:text-[42px] tablet:leading-[64px] text-black",
              "mobile:text-[16px] mobile:leading-6",
              "pc:hidden"
            )}
          >
            플레이하이브에서 소통한다면 <br /> 다양한 즐거운 경험들을 얻어요.
          </p>
        </div>
        <p
          className={cn(
            "tablet:text-[18px] tablet:leading-7 tablet:tracking-[-0.04em] text-gray7",
            "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
          )}
        >
          플레이 하이브는 유저분들의 자유롭고 즐거운 토론과 소통을 위해서
          직관적이고 커뮤니티에 집중할 수 있는 UIUX 디자인을 제공하고 있습니다.
          또한 실시간 경기중계를 보면서 함께 채팅을 나눌수 있는 경기 중계
          페이지를 통해서도 팬심을 드러내어 응원을 열심히 해보세요.
        </p>
      </div>
      <div
        className={cn(
          "max-w-[640px] min-h-[368px] flex gap-4 flex-col items-center justify-center",
          "tablet:w-full tablet:order-1",
          "mobile:w-full mobile:min-h-[208px] mobile:order-1"
        )}
      >
        {serviceBenefits.map((item, index) => (
          <ServiceBenefitItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FirstBenefit;
