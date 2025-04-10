"use client";

import { Openeyes_blue } from "@/app/_components/icon/Openeyes_blue";
import { Openeyes_off } from "@/app/_components/icon/Openeyes_off";
import { Clear } from "@/app/_components/icon/Clear";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SnsButtons from "./SnsButtons";
import AccountHelp from "./AccountHelp";
import { ErrorMessage } from "@hookform/error-message";
import useLogin from "@/_hooks/fetcher/sign/useLogin";
import { LoginFormData } from "../types/login";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { mutate: fetchLogin, isPending, isError } = useLogin();

  const inputObject = [
    {
      label: "이메일 아이디",
      type: "text",
      id: "username" as keyof LoginFormData,
      placeholder: "아이디를 입력해주세요.",
      validation: "이메일 아이디를 확인해주세요.",
    },
    {
      label: "비밀번호",
      type: isPasswordVisible ? "text" : "password",
      id: "password" as keyof LoginFormData,
      placeholder: "비밀번호를 입력해주세요.",
      validation: "비밀번호를 확인해주세요.",
    },
  ];

  const inputIcon = (inputId: keyof LoginFormData) => {
    const value = watch(inputId);
    if (!value || value.length === 0) return null;

    const handleClick =
      inputId === "username" ? handleUsernameClear : handlePasswordVisible;
    const Icon =
      inputId === "password" && isPasswordVisible
        ? Openeyes_blue
        : inputId === "password"
        ? Openeyes_off
        : Clear;

    return (
      <button className={iconButtonStyle} type="button" onClick={handleClick}>
        <Icon />
      </button>
    );
  };

  const handleUsernameClear = () => {
    if (isPending) return;
    setValue("username", "");
  };

  const handlePasswordVisible = () => {
    if (isPending) return;
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data: LoginFormData) => {
    fetchLogin(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[12px] px-[16px] pr-[44px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const isEmptyOrErrorInputStyle =
    inputStyle + " border-[#D1504B] focus:border-[#D1504B]";
  const iconButtonStyle = "absolute right-[16px] top-[38px]";
  return (
    <>
      <form className="w-full mt-[24px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-[24px]">
          {inputObject.map((input) => (
            <div className="space-y-[4px] relative" key={input.id}>
              <label
                htmlFor={input.id}
                className="text-[14px] leading-[22px] text-[#424242]"
              >
                {input.label}
              </label>
              <input
                {...register(input.id, { required: input.validation })}
                type={input.type}
                autoFocus={input.id === "username"}
                className={
                  isPending
                    ? isDisabledInputStyle
                    : isError || errors[input.id]
                    ? isEmptyOrErrorInputStyle
                    : inputStyle
                }
                id={input.id}
                disabled={isPending}
                placeholder={input.placeholder}
              />
              {inputIcon(input.id)}
              <ErrorMessage
                errors={errors}
                name={input.id}
                render={({ message }) =>
                  !isError && (
                    <p className="text-[14px] text-[#D1504B] ml-[16px]">
                      {message}
                    </p>
                  )
                }
              />
              {isError && (
                <p className="text-[14px] text-[#D1504B] ml-[16px]">
                  {input.validation}
                </p>
              )}
            </div>
          ))}
          <button
            className={`w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] ${
              isPending ? "bg-[#EEEEEE] text-[#CBCBCB]" : "defaultButtonColor"
            }`}
            disabled={isPending}
            type="submit"
          >
            자동로그인
          </button>
          <SnsButtons signState="login" />
        </div>
      </form>
      <div className="mt-[24px]">
        <AccountHelp signState="login" />
      </div>
    </>
  );
};

export default Login;
