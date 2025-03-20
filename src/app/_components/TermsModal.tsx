"use client";

import TermsServiceText from "./TermsServiceText";
import TermsPersonalText from "./TermsPersonalText";

interface Show {
  service: boolean;
  personal: boolean;
}

interface TearmsModalProps {
  show: Show;
  setShow: (show: Show) => void;
}

const TearmsModal = ({ show, setShow }: TearmsModalProps) => {
  const disabledModal = () => setShow({ service: false, personal: false });

  return (
    <div
      className="fixed inset-0 bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50"
      onClick={disabledModal}
    >
      <div
        className="flex flex-col gap-[24px] p-[40px] w-[640px] h-[600px] rounded-[10px] bg-[#FFFFFF] shadow-lg text-[#000000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-[16px]">
          <h1 className="font-[700] text-[24px] leading-[38px] text-[#000000]">
            이용약관
          </h1>
          <div className="overflow-y-auto h-[390px] bg-[#FAFAFA] rounded-[10px] p-[32px]">
            {show.service ? <TermsServiceText /> : <TermsPersonalText />}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center w-[160px] h-[52px] rounded-[5px] px-[18px] py-[22px] bg-gra text-[#FFFFFF] text-[16px] font-[700]"
            onClick={disabledModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TearmsModal;
