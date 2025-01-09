"use client";

import axios from "axios";
import { useState } from "react";
import Login from "./_components/Login";
import Signup from "./_components/Signup";

export default function Sign() {
  const [loginSignupState, setLoginSignupState] = useState("login");
  const [signupValue, setSignupValue] = useState({
    email: "",
    password: "",
    tel: "",
    nickname: "",
    gender: "",
  });
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
  });

  const fetchSign = async () => {
    const signUrl = loginSignupState === "login" ? "/login" : "/api/me/create";
    const signValue = loginSignupState === "login" ? loginValue : signupValue;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${signUrl}`,
      signValue,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  };

  const fetchState = async () => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/members/status`,
      {
        email: signupValue.email,
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchSign().then((data) => {
      if (data?.data?.status === "PENDING") {
        fetchState().catch((error) => {
          if (error.response.status === 401) {
            fetchToken();
          }
        });
      }
    });
  };

  const loginSignupStyle =
    "w-1/2 flex items-center justify-center rounded-t-[5px] cursor-pointer border-gray-600 border-[#303030] text-[#424242]";

  return (
    <div className="w-[328px] min-h-[480px] mx-auto">
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
      <form
        className="w-full text-gray-500 font-semibold mt-[24px]"
        onSubmit={onSubmit}
      >
        {loginSignupState === "login" ? (
          <Login setLoginValue={setLoginValue} />
        ) : (
          <Signup setSignupValue={setSignupValue} />
        )}
      </form>
    </div>
  );
}
