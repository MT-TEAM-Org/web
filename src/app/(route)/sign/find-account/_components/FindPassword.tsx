"use client";

import { useForm } from "react-hook-form";
import AccountHelp from "../../_components/AccountHelp";
import SnsButtons from "../../_components/SnsButtons";
import { useEffect, useState } from "react";

interface FormData {
  email: string;
  emailCode: string;
}

const FindPassword = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

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

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const verificationButton =
    "w-[80px] h-[48px] bg-[#424242] text-[#FFFFFF] leading-[16px] rounded-[5px] font-[700] py-[16px] px-[20px]";
  return (
    <form className="space-y-[24px]">
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
              className={`${inputStyle} w-[240px]`}
              id="email"
              // disabled={isPending || checkVerificationIsSuccess}
              placeholder="이메일 아이디를 입력해주세요."
            />
            {/* {sendVerificationIsSuccess ? (
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
            )} */}
            <button
              className={verificationButton}
              type="button"
              // onClick={handleSendVerification}
            >
              전송
            </button>
          </div>
          {/* {formErrors.email && (
            <p className="text-[14px] text-[#D1504B] ml-[16px]">
              이메일 인증을 진행해주세요.
            </p>
          )} */}
        </div>
        {/* <div className="space-y-[4px]">
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
            <p className={isPending ? isDisabledHelpTextStyle : helpTextStyle}>
              인증 시간 제한{" "}
              {timeLeft !== null &&
                `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(
                  2,
                  "0"
                )}`}
            </p>
          ) : null}
        </div> */}
      </div>
      <button
        className={
          "w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor"
        }
        // disabled={isPending}
        type="submit"
      >
        비밀번호 찾기
      </button>
      <SnsButtons signState="login" />
      <AccountHelp signState="signup" />
    </form>
  );
};

export default FindPassword;
