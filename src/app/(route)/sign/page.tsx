"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./_components/Login";
import Signup from "./_components/Signup";
import { useForm } from "react-hook-form";

interface LoginFormData {
  username: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  tel: string;
  nickname: string;
}

interface FormData {
  username: string;
  password: string;
  email: string;
  tel: string;
  nickname: string;
}

export default function Sign() {
  const [loginSignupState, setLoginSignupState] = useState<"login" | "signup">(
    "login"
  );
  const [signError, setSignError] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const usernameValue = watch("username");
  const passwordValue = watch("password");

  useEffect(() => {
    if (usernameValue === "" || passwordValue === "") {
      setSignError(false);
    }
  }, [usernameValue, passwordValue]);

  const fetchSign = async (data: FormData) => {
    const signUrl = loginSignupState === "login" ? "/login" : "/api/me/create";

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${signUrl}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  };

  const fetchState = async (email: string) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/members/status`,
      {
        email,
        status: "ACTIVE",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  };

  const fetchToken = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reissue`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  };

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    fetchSign(formData)
      .then((res) => {
        if (res?.data?.status === "PENDING") {
          fetchState(formData.email).catch((error) => {
            if (error.response.status === 401) {
              fetchToken();
            }
          });
        }
      })
      .catch(() => {
        setSignError(true);
      });
  };

  const loginSignupStyle =
    "w-1/2 flex items-center justify-center rounded-t-[5px] cursor-pointer border-gray-600 border-[#303030] text-[#424242]";

  return (
    <div className="w-[328px] min-h-[480px] mx-auto mt-[40px]">
      <div className="w-full min-h-[52px] flex">
        <div
          className={`${loginSignupStyle} ${
            loginSignupState === "login"
              ? "border-[1px] border-b-0 font-[700]"
              : "border-b text-[#A6A6A6] border-[#A6A6A6]"
          }`}
          onClick={() => setLoginSignupState("login")}
        >
          로그인
        </div>
        <div
          className={`${loginSignupStyle} ${
            loginSignupState === "signup"
              ? "border-[1px] border-b-0 font-[700]"
              : "border-b text-[#A6A6A6] border-[#A6A6A6]"
          }`}
          onClick={() => setLoginSignupState("signup")}
        >
          회원가입
        </div>
      </div>
      <form className="w-full mt-[24px]" onSubmit={handleSubmit(onSubmit)}>
        {loginSignupState === "login" ? (
          <Login
            register={register}
            setValue={setValue}
            watch={watch}
            signError={signError}
          />
        ) : (
          // <Signup register={register} />
          <div className="text-center">Signup</div>
        )}
      </form>
    </div>
  );
}
