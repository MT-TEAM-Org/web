"use client";

import SnsButtons from "./SnsButtons";
import Input from "@/app/_components/Input";
import AccountHelp from "./AccountHelp";
import { lazy, useEffect, useState } from "react";
import useSignup from "@/_hooks/fetcher/sign/useSignup";
import { useForm } from "react-hook-form";
import SignupMainLogo from "./SignupMainLogo";
import EmailVerification from "./EmailVerification";
import Agree from "./Agree";
import { SignupFormData } from "../types/signup";
import { signupInputObject } from "../constants/signup";
import { useToast } from "@/_hooks/useToast";

interface Selected {
  allAgree: boolean;
  serviceAgree: boolean;
  personalAgree: boolean;
  marketingAgree: boolean;
  [key: string]: boolean;
}

const TearmsModal = lazy(
  () => import("@/app/_components/termsModal/TermsModal")
);

const Signup = () => {
  const { error } = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>();
  const { mutate: signup, isPending, isError } = useSignup();
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
  const [successVerification, setSuccessVerification] = useState(false);

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

  const onSubmit = (data: SignupFormData) => {
    if (!selected.serviceAgree || !selected.personalAgree) {
      error("필수 약관에 동의해주세요.", "");
      return;
    }
    if (!successVerification) {
      error("이메일 인증을 완료해주세요.", "");
      return;
    }
    signup(data);
  };

  return (
    <>
      <form className="w-full mt-[24px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-[24px] mb-[40px]">
          <SignupMainLogo logo="기본" />
          <SnsButtons signState="signup" />
          <div className="space-y-[4px]">
            <EmailVerification
              register={register}
              getValues={getValues}
              errors={errors}
              isPending={isPending}
              setSuccessVerification={setSuccessVerification}
            />
          </div>
          {signupInputObject.map((input) => (
            <div className="space-y-[4px] relative" key={input.id}>
              <Input
                {...register(input.id, input.validation || {})}
                type={input.type}
                id={input.id}
                isDisabled={isPending}
                placeholder={input.placeholder}
                height={48}
                register={register}
                label={input.label}
                required
              />
              <p
                className={`text-[14px] mx-[16px] ${
                  errors[input.id] || isError ? "text-[#D1504B]" : "text-gray5"
                }`}
              >
                {errors[input.id]?.message || input.defultMessage}
              </p>
            </div>
          ))}
          <Agree
            setShow={setShow}
            selected={selected}
            setSelected={setSelected}
          />
          <button
            className="w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor select-none"
            disabled={isPending}
            type="submit"
          >
            회원가입 완료
          </button>
        </div>
      </form>
      {show.service || show.personal || show.sequence ? (
        <TearmsModal show={show} setShow={setShow} />
      ) : null}
      <div className="mb-[80px]">
        <AccountHelp signState="signup" />
      </div>
    </>
  );
};

export default Signup;
