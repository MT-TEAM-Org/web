import React from "react";
import { cn } from "@/utils";

const ServiceMainBox = () => {
  return (
    <div
      className={cn(
        "w-[520px] min-h-[296px] rounded-[20px] p-10 flex gap-6 shadow-sm bg-white z-10",
        "mobile:w-[264px] mobile:h-[188px] mobile:min-h-0 mobile:rounded-[5px] mobile:p-4 mobile:gap-2"
      )}
    >
      <div
        className={cn(
          "w-full min-h-[216px] flex flex-col gap-6",
          "mobile:gap-2"
        )}
      >
        <div
          className={cn(
            "w-full min-h-[60px] items-center text-center font-bold text-[28px] leading-10 tracking-[-0.04em]",
            "mobile:text-start mobile:text-[14px] mobile:leading-5 mobile:min-h-[40px]"
          )}
        >
          <h1 className="text-gray9">스포츠팬 여러분!</h1>
          <h1>
            이제 <span className="text-gra">플레이하이브</span>에서 함께
            응원하세요!
          </h1>
        </div>
        <p
          className={cn(
            "text-center text-[18px] leading-7 text-gray7 tracking-[-0.04em]",
            "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] mobile:text-start"
          )}
        >
          우리는 스포츠 팬들이 서로 존중하며 소통할 수 있는 공간을 만듭니다.
          플하는 팬덤 문화를 선도하는 새로운 플랫폼입니다. 내가 응원하는 팀,
          선수에 대한 정보를 실시간으로 확인하고, 다른 팬들과 자유롭게 소통하며,
          다양한 콘텐츠를 함께 만들어갈 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ServiceMainBox;
