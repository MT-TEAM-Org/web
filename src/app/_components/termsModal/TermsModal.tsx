"use client";

import { cn } from "@/utils";
import TermsPersonalText from "./TermsPersonalText";
import TermsServiceText from "./TermsServiceText";
import CustomIcon from "../IconComponents/Icon";
import { useRef } from "react";
import { createPortal } from "react-dom";

interface Show {
  service: boolean;
  personal: boolean;
  sequence: number;
}

interface TearmsModalProps {
  show: Show;
  setShow: (show: Show) => void;
}

const TearmsModal = ({ show, setShow }: TearmsModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pcScrollRef = useRef<HTMLDivElement>(null);

  const disabledModal = () => {
    if (show.sequence === 0) {
      setShow({ service: false, personal: false, sequence: 0 });
    } else {
      sequenceModal();
    }
  };

  const sequenceModal = () => {
    if (show.sequence === 1) {
      setShow({ service: true, personal: false, sequence: 2 });
    } else if (show.sequence === 2) {
      setShow({ service: false, personal: false, sequence: 0 });
    }
    if (window.innerWidth <= 768) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    } else {
      pcScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50"
      onClick={disabledModal}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex flex-col gap-[24px] p-[40px] w-[640px] h-[600px] rounded-[10px] bg-[#FFFFFF] shadow-lg text-[#000000]",
          "mobile:w-full mobile:h-screen mobile:rounded-none mobile:p-0 mobile:justify-start mobile:gap-0 mobile:overflow-y-scroll"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-[16px]",
            "mobile:gap-0"
          )}
        >
          <h1
            className={cn(
              "font-[700] text-[24px] leading-[38px] text-[#000000]",
              "mobile:hidden"
            )}
          >
            {show.service ? "이용약관" : "개인정보 수집 및 이용 동의"}
          </h1>
          <div
            className={cn(
              "hidden",
              "mobile:flex mobile:justify-between mobile:items-center mobile:h-[48px] mobile:w-full mobile:border-b-1 mobile:border-gray2"
            )}
          >
            <h1
              className={cn(
                "hidden",
                "mobile:block mobile:font-[700] mobile:leading-[26px] mobile:py-[10px] mobile:pl-[16px]"
              )}
            >
              {show.service ? "이용약관" : "개인정보 수집 및 이용 동의"}
            </h1>
            <button
              className={cn("hidden", "mobile:block mobile:p-[12px]")}
              onClick={disabledModal}
            >
              <CustomIcon icon="CLOSE_X" className="w-[24px] h-[24px]" />
            </button>
          </div>
          <div
            ref={pcScrollRef}
            className={cn(
              "overflow-y-auto min-w-[560px] h-[390px] bg-[#FAFAFA] rounded-[10px]",
              "mobile:min-w-full mobile:h-auto mobile:overflow-auto mobile:bg-white"
            )}
          >
            {show.service ? (
              <div
                className={cn("p-[32px]", "mobile:p-[16px] mobile:pl-[32px]")}
              >
                <TermsServiceText />
              </div>
            ) : (
              <div className={cn("p-[32px]", "mobile:p-[16px]")}>
                <TermsPersonalText />
              </div>
            )}
          </div>
        </div>
        <div
          className={cn(
            "flex justify-center",
            "mobile:w-full mobile:bg-white mobile:p-[16px] mobile:pt-0"
          )}
        >
          <button
            type="button"
            className={cn(
              "flex items-center justify-center w-[160px] h-[52px] rounded-[5px] px-[18px] py-[22px] bg-gra text-[#FFFFFF] text-[16px] font-[700]",
              "mobile:w-full"
            )}
            onClick={disabledModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TearmsModal;
