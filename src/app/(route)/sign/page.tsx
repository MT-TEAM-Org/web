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
import { useSocialEmailStore } from "@/utils/Store";
import useReissue from "@/_hooks/useReissue";

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
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  const { mutate: reissue } = useReissue();
  const { signStateStore, setClearSignupStore } = useSignupStore();
  const { social, resetSocial } = useSocialStore();
  const { email, setEmail, resetEmail } = useSocialEmailStore();
  const [loginSignupState, setLoginSignupState] = useState<"login" | "signup">(
    "login"
  );
  const { mutate: fetchEditUserData } = useEditUserData();
  const [successAgree, setSuccessAgree] = useState(false);
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const emailParam = searchParams.get("email");
  const { register, handleSubmit, getValues, setValue, watch, reset } =
    useForm<FormData>({
      defaultValues: {
        email: email || "",
      },
    });

  useEffect(() => {
    reset();
  }, [loginSignupState]);

  useEffect(() => {
    const tokenExists = localStorage.getItem("accessToken");

    if (statusParam === "PENDING" && !tokenExists) {
      reissue();
    }
  }, [statusParam]);

  useEffect(() => {
    if (statusParam === "PENDING" && emailParam) {
      setEmail(emailParam);
    }
  }, []);

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email]);

  useEffect(() => {
    if (social !== "") {
      setLoginSignupState("signup");
    }
  }, [social]);

  const { mutate: fetchSign, isPending } = usePostToken(
    loginSignupState === "login" ? "login" : "api/me/create"
  );

  const tabs: Tabs[] = [
    { id: "login", label: "로그인" },
    { id: "signup", label: "회원가입" },
  ];

  const onSubmit = (formData: FormData) => {
    if (loginSignupState === "signup" && !successAgree) {
      // 약관 확인이 정상적으로 동작하지 않음
      return alert("필수약관에 동의해주세요.");
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
            setSuccessAgree(false);
            setClearSignupStore();
            resetSocial();
            resetEmail();
            router.push("/");
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
      return;
    }

    const formDataRequest =
      loginSignupState === "login"
        ? { username: formData.username, password: formData.password }
        : formData;
    fetchSign(formDataRequest, {
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

  const shouldRenderSignup =
    signStateStore !== "" || loginSignupState !== "login";
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
        {shouldRenderSignup ? (
          <Signup
            register={register}
            getValues={getValues}
            isPending={isPending}
            setSuccessAgree={setSuccessAgree}
          />
        ) : (
          <Login
            register={register}
            setValue={setValue}
            watch={watch}
            isPending={isPending}
          />
        )}
      </form>
    </div>
  );
}
