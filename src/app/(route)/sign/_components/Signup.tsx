"use client";

import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { SymbolLogo } from "./SymbolLogo";
import SnsButtons from "./SnsButtons";
import Input from "@/app/_components/Input";
import AccountHelp from "./AccountHelp";
import { useEffect, useState } from "react";
import { CheckboxNull } from "@/app/_components/icon/CheckboxNull";
import { Checkbox } from "@/app/_components/icon/Checkbox";
import { useApiMutation } from "@/_hooks/query";

interface FormData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
  code: string;
}

interface SignupProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  isPending: boolean;
  isError: boolean;
}

interface Selected {
  allAgree: boolean;
  serviceAgree: boolean;
  personalAgree: boolean;
  marketingAgree: boolean;
  [key: string]: boolean;
}

interface EmailVerificationRequest {
  email: string;
}

interface VerificationCodeRequest {
  email: string;
  code: string;
}

const Signup = ({ register, watch, isPending, isError }: SignupProps) => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [selected, setSelected] = useState<Selected>({
    allAgree: false,
    serviceAgree: false,
    personalAgree: false,
    marketingAgree: false,
  });

  const email = watch("email");

  useEffect(() => {
    const { serviceAgree, personalAgree, marketingAgree } = selected;

    // 개별 체크박스들이 모두 체크되었을 때만 전체 동의를 체크
    if (serviceAgree && personalAgree && marketingAgree && !selected.allAgree) {
      setSelected((prev) => ({
        ...prev,
        allAgree: true,
      }));
    }
    // 하나라도 체크가 해제되면 전체 동의 해제
    else if (!serviceAgree || !personalAgree || !marketingAgree) {
      setSelected((prev) => ({
        ...prev,
        allAgree: false,
      }));
    }
  }, [selected.serviceAgree, selected.personalAgree, selected.marketingAgree]);

  const { mutate: sendVerification } = useApiMutation<EmailVerificationRequest>(
    "post",
    "/api/certification/send",
    null,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    {
      onSuccess: (data: EmailVerificationRequest) => {
        setIsVerificationSent(true);
        console.log("인증전송 성공", data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: checkVerification } = useApiMutation<VerificationCodeRequest>(
    "post",
    "/api/certification/certify-code",
    null,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    {
      onSuccess: (data: VerificationCodeRequest) => {
        console.log("인증코드 확인 성공", data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSendVerification = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    sendVerification({ email });
  };

  const handleCheckVerification = () => {
    checkVerification({ email, code: verificationCode });
  };

  const inputObject = [
    {
      label: "비밀번호",
      type: "password",
      id: "password",
      placeholder: "비밀번호를 입력해주세요.",
      validation: "영문+숫자 조합 4자~10자 이내",
    },
    {
      label: "핸드폰 번호",
      type: "text",
      id: "tel" as keyof FormData,
      placeholder: "핸드폰 번호를 입력해주세요.",
      validation: "10자~11자 이내",
    },
    {
      label: "닉네임",
      type: "text",
      id: "nickname",
      placeholder: "닉네임을 입력해주세요.",
      validation:
        "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로) 정치 관련, 반사회적, 성적, 욕설 닉네임은 제재대상",
    },
  ];

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
    setSelected({
      allAgree: newValue,
      serviceAgree: newValue,
      personalAgree: newValue,
      marketingAgree: newValue,
    });
  };

  const inputStyle =
    "h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6] focus:border-[#424242] focus:border-[1px] focus:outline-none";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
  const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
  const verificationButton =
    "w-[80px] bg-[#424242] text-[#FFFFFF] text-[16px] rounded-[5px] font-[700]";
  const disabledVerificationButton =
    "w-[80px] bg-[#FAFAFA] text-[#424242] text-[16px] rounded-[5px] font-[700]";

  return (
    <div className="space-y-[24px]">
      <div className="flex flex-col items-center gap-[8px] min-h-[86px]">
        <div className="flex justify-center items-center w-[52px] h-[52px] bg-[#FAFAFA] rounded-full border-[1px] border-[#EEEEEE]">
          <SymbolLogo />
        </div>
        <p className="font-[700] text-[16px] leading-[26px] text-[#424242]">
          플레이하이브 일반 회원가입
        </p>
      </div>
      <SnsButtons />
      <div className="space-y-[8px]">
        <div className="space-y-[4px]">
          <label
            htmlFor="email"
            className="text-[14px] leading-[22px] text-[#424242]"
          >
            이메일 인증
          </label>
          <div className="flex justify-between gap-[8px]">
            <input
              {...register("email", { required: true })}
              type="text"
              className={`${
                isPending ? isDisabledInputStyle : inputStyle
              } w-[240px]`}
              id="email"
              disabled={isPending}
              placeholder="이메일 아이디를 입력해주세요."
            />
            {isVerificationSent ? (
              <button
                className={disabledVerificationButton}
                type="button"
                onClick={handleSendVerification}
              >
                재전송
              </button>
            ) : (
              <button
                className={verificationButton}
                type="button"
                onClick={handleSendVerification}
              >
                인증 전송
              </button>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {isVerificationSent && (
            <div className="flex justify-between] gap-[8px]">
              <input
                type="text"
                className={`${
                  isPending ? isDisabledInputStyle : inputStyle
                } w-[240px]`}
                id="email"
                disabled={isPending}
                placeholder="인증코드를 입력해주세요."
              />
              <button className={verificationButton} type="button">
                인증
              </button>
            </div>
          )}

          <p className={isPending ? isDisabledHelpTextStyle : helpTextStyle}>
            인증 시간 제한 5:00
          </p>
        </div>
      </div>
      {inputObject.map((input) => (
        <Input
          key={input.id}
          height={48}
          type={input.type}
          id={input.id}
          register={register}
          placeholder={input.placeholder}
          helpText={input.validation}
          label={input.label}
          isDisabled={isPending}
          isError={isError}
        />
      ))}
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
                onChange={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [agreement.id]: !prev[agreement.id],
                  }))
                }
                className="hidden"
              />
              <label className="cursor-pointer" htmlFor={agreement.id}>
                {selected[agreement.id] ? <Checkbox /> : <CheckboxNull />}
              </label>
              <label
                htmlFor={agreement.id}
                className={`text-[14px] leading-[22px] text-[#424242] select-none ${
                  selected[agreement.id] && "underline"
                }`}
              >
                {agreement.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        className="w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor select-none"
        disabled={isPending}
        type="submit"
      >
        회원가입 완료
      </button>
      <AccountHelp signState="signup" />
    </div>
  );
};

export default Signup;
