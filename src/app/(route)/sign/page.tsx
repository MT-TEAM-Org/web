"use client";

import { useEffect, useState } from "react";
import Login from "./_components/Login";
import Signup from "./_components/Signup";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/_hooks/query";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
}

interface Tabs {
  id: "login" | "signup";
  label: "로그인" | "회원가입";
}

export default function Sign() {
  const router = useRouter();
  const [loginSignupState, setLoginSignupState] = useState<"login" | "signup">(
    "login"
  );
  const [localIsError, setLocalIsError] = useState(false);
  const [isAllEmpty, setIsAllEmpty] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();
  const inputIsNotEmpty = Object.values(watch()).some((value) => value !== "");

  const {
    mutate: fetchSign,
    isPending,
    isError,
  } = useApiMutation(
    "post",
    loginSignupState === "login" ? "/login" : "/api/me/create",
    {},
    { withCredentials: true },
    {
      onSuccess: (data) => {
        console.log(
          loginSignupState === "login" ? "로그인 성공" : "회원가입 성공"
        );
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const tabs: Tabs[] = [
    { id: "login", label: "로그인" },
    { id: "signup", label: "회원가입" },
  ];

  useEffect(() => {
    reset();
    setLocalIsError(false);
  }, [loginSignupState]);

  useEffect(() => {
    setLocalIsError(isError);
  }, [isError]);

  useEffect(() => {
    if (inputIsNotEmpty) {
      setIsAllEmpty(false);
    }
  }, [inputIsNotEmpty]);

  const onSubmit = (formData: FormData) => {
    const isAllEmptySearch = Object.values(formData).every(
      (value) => value === ""
    );
    if (isAllEmptySearch) {
      return setIsAllEmpty(true);
    } else {
      setIsAllEmpty(false);
    }
    fetchSign(formData);
  };

  const loginSignupStyle =
    "w-1/2 flex items-center justify-center rounded-t-[5px] cursor-pointer border-gray-600 border-[#303030] text-[#424242]";
  return (
    <div className="w-[328px] min-h-[480px] mb-[356px] mx-auto mt-[40px] select-none">
      <div className="w-full min-h-[52px] flex">
        {tabs.map(({ id, label }) => (
          <div
            key={id}
            className={`${loginSignupStyle} ${
              loginSignupState === id
                ? "border-[1px] border-b-0 font-[700]"
                : "border-b text-[#A6A6A6] border-[#A6A6A6]"
            }`}
            onClick={() => setLoginSignupState(id)}
          >
            {label}
          </div>
        ))}
      </div>
      <form className="w-full mt-[24px]" onSubmit={handleSubmit(onSubmit)}>
        {loginSignupState === "login" ? (
          <Login
            register={register}
            setValue={setValue}
            watch={watch}
            isPending={isPending}
            isError={localIsError}
            isAllEmpty={isAllEmpty}
          />
        ) : (
          <Signup
            register={register}
            isPending={isPending}
            isError={localIsError}
          />
        )}
      </form>
    </div>
  );
}
