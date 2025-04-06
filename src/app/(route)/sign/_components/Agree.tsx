"use client";

import { useEffect } from "react";
import { CheckboxNull } from "@/app/_components/icon/CheckboxNull";
import { Checkbox } from "@/app/_components/icon/Checkbox";

interface Selected {
  allAgree: boolean;
  serviceAgree: boolean;
  personalAgree: boolean;
  marketingAgree: boolean;
  [key: string]: boolean;
}

interface AgreeProps {
  setShow: React.Dispatch<
    React.SetStateAction<{
      service: boolean;
      personal: boolean;
      sequence: number;
    }>
  >;
  selected: Selected;
  setSelected: React.Dispatch<React.SetStateAction<Selected>>;
}

const Agree = ({ setShow, selected, setSelected }: AgreeProps) => {
  useEffect(() => {
    const { allAgree, serviceAgree, personalAgree, marketingAgree } = selected;

    const isRequiredAgreed = serviceAgree && personalAgree;
    const isAllAgreed = isRequiredAgreed && marketingAgree;

    if (isAllAgreed && !allAgree) {
      setSelected((prev: Selected) => ({
        ...prev,
        allAgree: true,
      }));
    }

    if (!isAllAgreed && allAgree) {
      setSelected((prev) => ({
        ...prev,
        allAgree: false,
      }));
    }
  }, [selected]);

  const agreementObject = [
    {
      id: "serviceAgree",
      label: "서비스 이용약관 동의 (필수)",
    },
    {
      id: "personalAgree",
      label: "개인정보 수집 및 이용 동의 (필수)",
    },
    {
      id: "marketingAgree",
      label: "마케팅 수신 동의 (선택)",
    },
  ];

  const handleAllAgree = () => {
    const newValue = !selected.allAgree;
    if (newValue && !selected.serviceAgree && !selected.personalAgree) {
      setShow({
        service: false,
        personal: false,
        sequence: 1,
      });
    }
    setSelected({
      allAgree: newValue,
      serviceAgree: newValue,
      personalAgree: newValue,
      marketingAgree: newValue,
    });
  };

  return (
    <div className="space-y-[16px] p-[16px] rounded-[5px] bg-[#FAFAFA]">
      <div className="flex items-center gap-[8px]">
        <input
          type="checkbox"
          className="hidden"
          id="allAgree"
          checked={selected.allAgree}
          onChange={handleAllAgree}
        />
        <label className="cursor-pointer" htmlFor="allAgree">
          {selected.allAgree ? <Checkbox /> : <CheckboxNull />}
        </label>
        <label
          htmlFor="allAgree"
          className="font-[700] leading-[24px] text-[#424242] select-none"
        >
          전체 동의
        </label>
      </div>
      <div className="space-y-[4px]">
        {agreementObject.map((agreement) => (
          <div className="flex items-center gap-[8px]" key={agreement.id}>
            <input
              type="checkbox"
              id={agreement.id}
              checked={selected[agreement.id]}
              onChange={() => {
                if (
                  agreement.id !== "marketingAgree" &&
                  !selected[agreement.id]
                ) {
                  setShow((prev) => {
                    return {
                      ...prev,
                      [agreement.id === "serviceAgree"
                        ? "service"
                        : "personal"]: true,
                    };
                  });
                }
                setSelected((prev) => ({
                  ...prev,
                  [agreement.id]: !prev[agreement.id],
                }));
              }}
              className="hidden"
            />
            <label className="cursor-pointer" htmlFor={agreement.id}>
              {selected[agreement.id] ? <Checkbox /> : <CheckboxNull />}
            </label>
            <label
              htmlFor={agreement.id}
              className={`text-[14px] leading-[22px] text-[#424242] select-none underline ${
                agreement.id === "marketingAgree" && "no-underline"
              }`}
            >
              {agreement.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agree;
