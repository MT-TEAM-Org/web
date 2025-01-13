"use client";

import { Openeyes_blue } from "@/app/_components/icon/Openeyes_blue";
import { Openeyes_off } from "@/app/_components/icon/Openeyes_off";
import { Clear } from "@/app/_components/icon/Clear";
import { useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SnsButtons from "./SnsButtons";
import AccountHelp from "./AccountHelp";

interface FormData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
}

interface LoginProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  isPending: boolean;
  isError: boolean;
  isAllEmpty: boolean;
}

const Login = ({
  register,
  setValue,
  watch,
  isPending,
  isError,
  isAllEmpty,
}: LoginProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputObject = [
    {
      label: "이메일 아이디",
      type: "text",
      id: "username" as keyof FormData,
      placeholder: "아이디를 입력해주세요.",
    },
    {
      label: "비밀번호",
      type: isPasswordVisible ? "text" : "password",
      id: "password" as keyof FormData,
      placeholder: "비밀번호를 입력해주세요.",
    },
  ];

  const errorMessages = (inputId: string) => {
    if (!isAllEmpty && !isError) return null;

    return (
      <p className="text-[14px] font-[500] text-[#D1504B] leading-[22px] px-[16px]">
        {inputId === "username"
          ? "이메일 아이디를 확인해주세요."
          : "비밀번호를 확인해주세요."}
      </p>
    );
  };

  const inputIcon = (inputId: keyof FormData) => {
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

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] outline-none placeholder-[#A6A6A6] focus:border-[#424242]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const isEmptyInputStyle = inputStyle + " border-[#424242]";
  const iconButtonStyle = "absolute right-[16px] top-[38px]";
  return (
    <div className="space-y-[24px]">
      {inputObject.map((input) => (
        <div className="space-y-[2px] relative" key={input.id}>
          <label
            htmlFor={input.id}
            className="text-[14px] leading-[22px] text-[#424242]"
          >
            {input.label}
          </label>
          <input
            {...register(input.id)}
            type={input.type}
            className={
              isPending
                ? isDisabledInputStyle
                : isAllEmpty
                ? isEmptyInputStyle
                : inputStyle
            }
            id={input.id}
            disabled={isPending}
            placeholder={input.placeholder}
          />
          {errorMessages(input.id)}
          {inputIcon(input.id)}
        </div>
      ))}
      <button
        className={`w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] ${
          isPending ? "bg-[#EEEEEE] text-[#CBCBCB]" : "defaultButtonColor"
        }`}
        disabled={isPending} // 리액트쿼리 isLoginLoading 값으로 변경
        type="submit"
      >
        자동로그인
      </button>
      <SnsButtons signState="login" />
      <AccountHelp signState="login" />
    </div>
  );
};

export default Login;
