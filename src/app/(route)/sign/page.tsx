"use client";

import { useEffect, useState } from "react";
import Login from "./_components/Login";
import Signup from "./_components/Signup";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import usePostToken from "@/utils/UsePostToken";
import { useQueryClient } from "@tanstack/react-query";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useSignupStore } from "@/utils/Store";
import { useSocialStore } from "@/utils/Store";
import useEditUserData from "@/_hooks/useEditUserData";

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
  const queryClient = useQueryClient();
  const { signStateStore, setClearSignupStore } = useSignupStore();
  const { social, resetSocial } = useSocialStore();
  const [loginSignupState, setLoginSignupState] = useState<"login" | "signup">(
    "login"
  );
  const [localIsError, setLocalIsError] = useState(false);
  const [isAllEmpty, setIsAllEmpty] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, getValues } =
    useForm<FormData>();
  const inputIsNotEmpty = Object.values(watch()).some((value) => value !== "");
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  const { mutate: fetchEditUserData } = useEditUserData();
  const [successAgree, setSuccessAgree] = useState(false);
  const [socialDefaultEmail, setSocialDefaultEmail] = useState("");
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const emailParam = searchParams.get("email");

  useEffect(() => {
    if (statusParam === "PENDING" && emailParam) {
      setValue("email", emailParam); // react-hook-form에 직접 값을 설정
      setSocialDefaultEmail && setSocialDefaultEmail(emailParam);
    }
  }, [statusParam, emailParam, setValue]);

  useEffect(() => {
    if (social !== "") {
      setLoginSignupState("signup");
    }
  }, [social]);

  const {
    mutate: fetchSign,
    isPending,
    isError,
  } = usePostToken(loginSignupState === "login" ? "login" : "api/me/create");

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
    console.log("formData", formData);
    console.log("social", social);
    console.log("loginSignupState", loginSignupState);

    const isAllEmptySearch = Object.values(formData).every(
      (value) => value === ""
    );
    if (isAllEmptySearch) {
      return setIsAllEmpty(true);
    } else {
      setIsAllEmpty(false);
    }
    if (loginSignupState === "signup") {
      if (!successAgree) {
        return alert("필수약관에 동의해주세요.");
      }
    }
    if (social !== "" && loginSignupState === "signup") {
      fetchEditUserData(
        {
          email: formData.email,
          tel: formData.tel,
          nickname: formData.nickname,
        },
        {
          onSuccess: () => {
            const joinToken = localStorage.getItem("joinToken");
            joinToken && localStorage.setItem("accessToken", joinToken);
            setSuccessAgree(false);
            setClearSignupStore();
            resetSocial();
            router.push("/");
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
      return;
    }

    fetchSign(formData, {
      onSuccess: (data) => {
        if (loginSignupState === "login") {
          localStorage.setItem("accessToken", data.headers.authorization);
          queryClient.setQueryData(["authCheck"], null);
          queryClient.invalidateQueries({ queryKey: ["authCheck"] });
          router.push("/");
        } else {
          setLoginSignupState("login");
          setSuccessAgree(false);
        }
      },
    });
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
        {signStateStore !== "" ? (
          <Signup
            register={register}
            watch={watch}
            isPending={isPending}
            isError={localIsError}
            setSuccessAgree={setSuccessAgree}
            setSocialDefaultEmail={setSocialDefaultEmail}
          />
        ) : loginSignupState === "login" ? (
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
            watch={watch}
            isPending={isPending}
            isError={localIsError}
            setSuccessAgree={setSuccessAgree}
          />
        )}
      </form>
    </div>
  );
}
