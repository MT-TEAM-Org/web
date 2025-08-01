"use client";

import { Openeyes_blue } from "@/app/_components/icon/Openeyes_blue";
import { Openeyes_off } from "@/app/_components/icon/Openeyes_off";
import Icon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./types/FormValues";
import useAdminLogin from "../_hooks/fetcher/auth/useAdminLogin";
import { AxiosError } from "axios";

const style = {
  label: "font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7",
  input:
    "w-full h-[48px] rounded-[5px] border px-4 py-3 border-gray3 text-black",
};

// TODO: 리팩토링 필요
const Page = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const adminLogin = useAdminLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const usernameValue = watch("username");
  const passwordValue = watch("password");

  const inputObject = [
    {
      label: "이메일 아이디",
      type: "text",
      id: "username" as keyof FormValues,
      placeholder: "아이디를 입력해주세요.",
      validation: "이메일 아이디를 확인해주세요.",
    },
    {
      label: "비밀번호",
      type: isPasswordVisible ? "text" : "password",
      id: "password" as keyof FormValues,
      placeholder: "비밀번호를 입력해주세요.",
      validation: "비밀번호를 확인해주세요.",
    },
  ];

  const onSubmit = (data: FormValues) => {
    setApiError(null);
    adminLogin.mutate(data, {
      onError: (error: AxiosError<{ message: string }>) => {
        setApiError(error.response?.data?.message || "로그인에 실패했습니다.");
      },
    });
  };

  return (
    <div className="w-[400px] min-h-[412px] rounded-[20px] p-10 flex flex-col gap-6 bg-white">
      <div className="min-w-[320px] h-[64px] p-4 flex gap-4">
        <Icon icon="ADMIN_LOGO" />
      </div>

      {/* 폼 */}
      <form
        className="flex flex-col items-start justify-center gap-6"
        onSubmit={handleSubmit(onSubmit)}>
        {inputObject.map((input) => (
          <div className="w-full flex flex-col gap-1 relative" key={input.id}>
            <label htmlFor={input.id} className={style.label}>
              {input.label}
            </label>
            <input
              type={input.type}
              id={input.id}
              autoFocus={input.id === "username"}
              placeholder={input.placeholder}
              className={cn(style.input, apiError && "border-warning")}
              {...register(input.id, { required: input.validation })}
            />
            {input.id === "password" && passwordValue && (
              <button
                type="button"
                className="absolute right-4 top-[38px]"
                aria-label="비밀번호 표시/숨김"
                onClick={() => setIsPasswordVisible((prev) => !prev)}>
                {isPasswordVisible ? <Openeyes_blue /> : <Openeyes_off />}
              </button>
            )}
          </div>
        ))}

        {/* 에러 메시지 */}
        {apiError && (
          <p className="w-full text-center font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-warning">
            {apiError === "Invalid or expired token." ? (
              <>
                해당 아이디 로그인 시도가 10번 불일치하여
                <br />
                계정이 잠금되었습니다.
              </>
            ) : (
              <>아이디 또는 비밀번호를 확인해주세요. (${apiError}/10)</>
            )}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={usernameValue === "" || passwordValue === ""}
          className={cn(
            "w-full h-[48px] rounded-[5px] font-bold text-[16px]",
            usernameValue === "" || passwordValue === ""
              ? "bg-gray2 text-gray4 cursor-not-allowed"
              : "bg-gra text-white"
          )}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Page;
