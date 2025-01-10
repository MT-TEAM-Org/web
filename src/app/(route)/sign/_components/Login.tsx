"use client";

import Link from "next/link";
import { Naver } from "@/app/_components/icon/Naver";
import { Kakao } from "@/app/_components/icon/Kakao";
import { Google } from "@/app/_components/icon/Google";
import { Discord } from "@/app/_components/icon/Discord";
import { Openeyes_blue } from "@/app/_components/icon/Openeyes_blue";
import { Openeyes_off } from "@/app/_components/icon/Openeyes_off";
import { Clear } from "@/app/_components/icon/Clear";
import { useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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
  signError: boolean;
}

const Login = ({ register, setValue, watch, signError }: LoginProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const usernameValue = watch("username");
  const passwordValue = watch("password");

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

  const snsButtonObject = [
    {
      name: "naver",
      icon: <Naver />,
    },
    {
      name: "kakao",
      icon: <Kakao />,
    },
    {
      name: "google",
      icon: <Google />,
    },
    {
      name: "discord",
      icon: <Discord />,
    },
  ];

  const snsGrayLine = () => {
    return <div className="w-[117px] h-[1px] border-[1px] border-[#EEEEEE]" />;
  };

  const errorMessages = (inputId: string) => {
    if (!signError) return null;

    return (
      <p className="text-[14px] font-[500] text-[#D1504B] leading-[22px] px-[16px]">
        {inputId === "username"
          ? "이메일 아이디를 확인해주세요."
          : "비밀번호를 확인해주세요."}
      </p>
    );
  };

  const handleUsernameClear = () => setValue("username", "");

  const handlePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6] focus:border-[#424242] focus:border-[1px] focus:outline-none";
  const iconButtonStyle = "absolute right-[16px] top-[38px]";
  return (
    <div className="space-y-[24px]">
      {inputObject.map((input) => (
        <div className="space-y-[4px] relative" key={input.id}>
          <label
            htmlFor={input.id}
            className="text-[14px] font-[500] leading-[22px] text-[#424242]"
          >
            {input.label}
          </label>
          <input
            {...register(input.id, { required: true })}
            type={input.type}
            className={inputStyle}
            id={input.id}
            placeholder={input.placeholder}
          />
          {errorMessages(input.id)}
          {input.id === "username" &&
            usernameValue &&
            usernameValue.length > 0 && (
              <button
                className={iconButtonStyle}
                type="button"
                onClick={handleUsernameClear}
              >
                <Clear />
              </button>
            )}
          {input.id === "password" &&
            passwordValue &&
            passwordValue.length > 0 && (
              <button
                className={iconButtonStyle}
                type="button"
                onClick={handlePasswordVisible}
              >
                {isPasswordVisible ? <Openeyes_blue /> : <Openeyes_off />}
              </button>
            )}
        </div>
      ))}
      <button className="w-full h-[48px] defaultButtonColor text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px]">
        자동로그인
      </button>

      <div className="flex items-center min-h-[18px] gap-[8px]">
        {snsGrayLine()}
        <p className="w-[78px] text-center text-[12px] text-[#000000] opacity-[50%] leading-[18px] whitespace-nowrap tracking-[-0.02em]">
          SNS 간편로그인
        </p>
        {snsGrayLine()}
      </div>
      <div className="flex gap-[24px] justify-around mt-[8px]">
        {snsButtonObject.map((snsButton) => (
          <button
            className="w-[52px] h-[52px] flex justify-center items-center p-[10px] border-[1px] bg-[#FAFAFA] border-[#EEEEEE] rounded-full"
            type="button"
            key={snsButton.name}
          >
            {snsButton.icon}
          </button>
        ))}
      </div>
      <div className="flex gap-[16px] mt-[24px] underline text-[14px] text-[#000000] opacity-[70%] text-center">
        <Link href="/" className="w-1/2 leading-[18px]">
          1:1 문의하기
        </Link>
        <Link href="/" className="w-1/2 leading-[18px]">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default Login;
