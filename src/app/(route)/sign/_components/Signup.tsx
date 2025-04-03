"use client";

import { UseFormRegister, UseFormGetValues } from "react-hook-form";
import { SymbolLogo } from "./SymbolLogo";
import SnsButtons from "./SnsButtons";
import Input from "@/app/_components/Input";
import AccountHelp from "./AccountHelp";
import { lazy, Suspense, useEffect, useState } from "react";
import { CheckboxNull } from "@/app/_components/icon/CheckboxNull";
import { Checkbox } from "@/app/_components/icon/Checkbox";
import { Google } from "@/app/_components/icon/Google";
import { Naver } from "@/app/_components/icon/Naver";
import { Kakao } from "@/app/_components/icon/Kakao";
import { Discord } from "@/app/_components/icon/Discord";
import { useApiMutation } from "@/_hooks/query";
import { useSocialStore } from "@/utils/Store";
import { FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const TearmsModal = lazy(
  () => import("@/app/_components/termsModal/TermsModal")
);

interface FormData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
}

interface SignupProps {
  register: UseFormRegister<FormData>;
  getValues: UseFormGetValues<FormData>;
  isPending: boolean;
  setSuccessAgree: React.Dispatch<React.SetStateAction<boolean>>;
  formErrors: FieldErrors<FormData>;
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

const Signup = ({
  register,
  getValues,
  isPending,
  setSuccessAgree,
  formErrors,
  isError,
}: SignupProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [selected, setSelected] = useState<Selected>({
    allAgree: false,
    serviceAgree: false,
    personalAgree: false,
    marketingAgree: false,
  });
  const [show, setShow] = useState({
    service: false,
    personal: false,
    sequence: 0,
  });
  const { social } = useSocialStore();

  useEffect(() => {
    if (show.service || show.personal || show.sequence) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0) {
        setIsExpired(true);
        setVerificationCode(""); // 인증 코드 초기화
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimerOn = () => {
    setTimeLeft(300);
    setIsExpired(false);
  };

  useEffect(() => {
    const { allAgree, serviceAgree, personalAgree, marketingAgree } = selected;

    const isRequiredAgreed = serviceAgree && personalAgree;
    const isAllAgreed = isRequiredAgreed && marketingAgree; // 3개가 모두 체크되었을 때만 true

    // 전체 동의 체크박스 동기화 (모든 약관이 체크되었을 때만 true)
    if (isAllAgreed && !allAgree) {
      setSelected((prev) => ({
        ...prev,
        allAgree: true,
      }));
    }

    // 하나라도 해제되면 allAgree를 false로 설정
    if (!isAllAgreed && allAgree) {
      setSelected((prev) => ({
        ...prev,
        allAgree: false,
      }));
    }

    // 필수 약관이 모두 체크되었을 때만 successAgree를 true로 설정
    setSuccessAgree(isRequiredAgreed);
  }, [selected]);

  const {
    mutate: sendVerification,
    isSuccess: sendVerificationIsSuccess,
    isError: sendVerificationIsError,
  } = useApiMutation<EmailVerificationRequest>(
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
        console.log("인증전송 성공", data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const {
    mutate: checkVerification,
    isSuccess: checkVerificationIsSuccess,
    isError: checkVerificationIsError,
    isIdle: checkVerificationIsIdle,
  } = useApiMutation<VerificationCodeRequest>(
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
    setIsExpired(false);
    const email = getValues("email");
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    sendVerification(
      { email },
      {
        onSuccess: () => {
          handleTimerOn();
        },
      }
    );
  };

  const handleCheckVerification = () => {
    const email = getValues("email");
    checkVerification(
      { email, code: verificationCode },
      {
        onSuccess: () => {
          setTimeLeft(null);
        },
      }
    );
  };

  const inputObject = [
    {
      label: "비밀번호",
      type: "password",
      id: "password" as keyof FormData,
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
      id: "nickname" as keyof FormData,
      placeholder: "닉네임을 입력해주세요.",
      validation:
        "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로) 정치 관련, 반사회적, 성적, 욕설 닉네임은 제재대상",
    },
  ];

  const snsInputObject = [
    {
      label: "이메일 아이디",
      type: "text",
      id: "email",
      placeholder: "이메일 아이디를 입력해주세요.",
      disabled: true,
    },
    {
      label: "핸드폰 번호",
      type: "text",
      id: "tel",
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

  const headLogoSign = () => {
    if (social === "google") return <Google />;
    else if (social === "naver") return <Naver />;
    else if (social === "kakao") return <Kakao />;
    else if (social === "discord") return <Discord />;
    else return <SymbolLogo />;
  };

  const headTextSign = () => {
    if (social === "google") return "구글 SNS 간편 회원가입";
    else if (social === "naver") return "네이버 SNS 간편 회원가입";
    else if (social === "kakao") return "카카오 SNS 간편 회원가입";
    else if (social === "discord") return "디스코드 SNS 간편 회원가입";
    else return "플레이하이브 일반 회원가입";
  };

  const inputStyle =
    "h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
  const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
  const verificationButton =
    "w-[80px] bg-[#424242] text-[#FFFFFF] text-[16px] rounded-[5px] font-[700]";
  const disabledVerificationButton =
    "w-[80px] bg-[#FAFAFA] text-[#424242] text-[16px] rounded-[5px] font-[700]";

  return (
    <>
      <div className="space-y-[24px] mb-[40px]">
        <div className="flex flex-col items-center gap-[8px] min-h-[86px]">
          <div className="flex justify-center items-center w-[52px] h-[52px] bg-[#FAFAFA] rounded-full border-[1px] border-[#EEEEEE]">
            {headLogoSign()}
          </div>
          <p className="font-[700] text-[16px] leading-[26px] text-[#424242]">
            {headTextSign()}
          </p>
        </div>
        <SnsButtons signState="signup" />
        {social === "" && (
          <div className="space-y-[8px]">
            <div className="space-y-[2px]">
              <label
                htmlFor="email"
                className="text-[14px] leading-[22px] text-[#424242]"
              >
                이메일 인증<span className="text-[#D1504B]">*</span>
              </label>
              <div className="flex justify-between gap-[8px]">
                <input
                  {...register("email", { required: true })}
                  type="text"
                  autoFocus
                  className={`${
                    isPending ? isDisabledInputStyle : inputStyle
                  } w-[240px]`}
                  id="email"
                  disabled={isPending || checkVerificationIsSuccess}
                  placeholder="이메일 아이디를 입력해주세요."
                />
                {sendVerificationIsSuccess ? (
                  <button
                    className={disabledVerificationButton}
                    type="button"
                    onClick={handleSendVerification}
                    disabled={checkVerificationIsSuccess}
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
              {formErrors.email && (
                <p className="text-[14px] text-[#D1504B] ml-[16px]">
                  이메일 인증을 진행해주세요.
                </p>
              )}
            </div>
            <div className="space-y-[4px]">
              {sendVerificationIsSuccess && (
                <div className="flex justify-between gap-[8px]">
                  <input
                    type="text"
                    className={`${
                      isPending ? isDisabledInputStyle : inputStyle
                    } w-[240px]`}
                    id="code"
                    disabled={isPending || checkVerificationIsSuccess}
                    placeholder="인증코드를 입력해주세요."
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  {checkVerificationIsSuccess ? (
                    <button
                      className={disabledVerificationButton}
                      disabled={true}
                      type="button"
                    >
                      인증완료
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckVerification}
                      className={verificationButton}
                      type="button"
                    >
                      인증
                    </button>
                  )}
                </div>
              )}
              {checkVerificationIsError ? (
                <p className="text-[14px] text-[#D1504B] ml-[16px]">
                  이메일 인증코드를 확인해주세요.
                </p>
              ) : isExpired ? (
                <p className="text-[14px] text-[#D1504B] ml-[16px]">
                  인증 시간이 만료되었습니다. 다시 인증해주세요.
                </p>
              ) : sendVerificationIsSuccess &&
                !checkVerificationIsSuccess &&
                !isExpired ? (
                <p
                  className={
                    isPending ? isDisabledHelpTextStyle : helpTextStyle
                  }
                >
                  인증 시간 제한{" "}
                  {timeLeft !== null &&
                    `${Math.floor(timeLeft / 60)}:${String(
                      timeLeft % 60
                    ).padStart(2, "0")}`}
                </p>
              ) : null}
            </div>
          </div>
        )}
        {social === ""
          ? inputObject.map((input) => (
              <div className="space-y-[4px]" key={input.id}>
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
                  validation={input.validation}
                />
                <ErrorMessage
                  errors={formErrors}
                  name={input.id}
                  render={({ message }) =>
                    !isError && (
                      <p className="text-[14px] text-[#D1504B] ml-[16px]">
                        {message}
                      </p>
                    )
                  }
                />
                {!isError && !formErrors[input.id] ? (
                  <p className="text-[14px] text-[#A6A6A6] ml-[16px]">
                    {input.validation}
                  </p>
                ) : null}
              </div>
            ))
          : snsInputObject.map((input) => (
              <Input
                key={input.id}
                height={48}
                type={input.type}
                id={input.id}
                register={register}
                placeholder={input.placeholder}
                helpText={input.validation}
                label={input.label}
                isDisabled={input.disabled}
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
        <button
          className="w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor select-none"
          disabled={isPending}
          type="submit"
        >
          회원가입 완료
        </button>
        <AccountHelp signState="signup" />
      </div>
      {(show.service || show.personal || show.sequence) && (
        <TearmsModal show={show} setShow={setShow} />
      )}
    </>
  );
};

export default Signup;
