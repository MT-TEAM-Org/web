"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loginSignupState, setLoginSignupState] = useState("login");

  const loginSignupStyle =
    "w-1/2 h-[60px] flex items-center justify-center rounded-t-md cursor-pointer border-gray-600";
  return (
    <div className="w-[600px] mx-auto mt-10">
      <div className="w-full flex text-lg font-semibold text-gray-500">
        <div
          className={`${loginSignupStyle} ${
            loginSignupState === "login" ? "border-2 border-b-0" : "border-b"
          }`}
          onClick={() => setLoginSignupState("login")}
        >
          로그인
        </div>
        <div
          className={`${loginSignupStyle} ${
            loginSignupState === "signup" ? "border-2 border-b-0" : "border-b"
          }`}
          onClick={() => setLoginSignupState("signup")}
        >
          회원가입
        </div>
      </div>
      <form
        className="w-full text-gray-500 font-semibold mt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {loginSignupState === "login" ? <Login /> : <Signup />}
      </form>
    </div>
  );
}

const Login = () => {
  const inputObject = [
    {
      label: "이메일 아이디",
      type: "text",
      id: "id",
      placeholder: "아이디를 입력해주세요.",
    },
    {
      label: "비밀번호",
      type: "password",
      id: "password",
      placeholder: "비밀번호를 입력해주세요.",
    },
  ];

  const inputStyle = "w-full border py-4 px-5 rounded-md font-medium";
  return (
    <div className="space-y-5">
      {inputObject.map((input) => (
        <div className="space-y-2" key={input.id}>
          <label htmlFor={input.id} className="text-sm font-semibold">
            {input.label}
          </label>
          <input
            type={input.type}
            className={inputStyle}
            id={input.id}
            placeholder={input.placeholder}
          />
        </div>
      ))}
      <button className="w-full bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md font-semibold">
        자동로그인
      </button>

      <div className="flex justify-center mt-5">
        <p className="text-sm text-gray-400 font-semibold">SNS 간편로그인</p>
      </div>
      <div className="w-[400px] mx-auto flex gap-2 justify-around mt-5">
        <button className="text-red-500">구글</button>
        <button className="text-green-500">네이버</button>
        <button className="text-yellow-500">카카오</button>
        <button className="text-blue-500">디스코드</button>
      </div>
      <div className="flex justify-around text-gray-500 text-sm font-semibold mt-5 underline">
        <Link href="/" className="hover:text-gray-600">
          1:1 문의하기
        </Link>
        <Link href="/" className="hover:text-gray-600">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

const Signup = () => {
  const inputObject = [
    {
      label: "비밀번호",
      type: "password",
      id: "password",
      placeholder: "비밀번호를 입력해주세요.",
      validation: "영문+숫자 조합 4자~10자 이내",
    },
    {
      label: "핸드폰 번호",
      type: "number",
      id: "phoneNumber",
      placeholder: "핸드폰 번호를 입력해주세요.",
      validation: "10자~11자 이내",
    },
    {
      label: "닉네임",
      type: "text",
      id: "nickname",
      placeholder: "닉네임을 입력해주세요.",
      validation: "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)",
    },
  ];

  const inputStyle = "w-full border py-4 px-5 rounded-md font-medium";
  const signupValidationStyle = "text-sm text-gray-400 ml-5";
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="id" className="text-sm font-semibold">
          이메일 아이디
        </label>
        <div className="flex gap-1">
          <input
            type="text"
            className={inputStyle}
            id="id"
            placeholder="아이디를 입력해주세요."
          />
          <button
            className="w-[100px] bg-gray-700 hover:bg-gray-800 p-1 text-white rounded-md font-semibold"
            type="button"
          >
            확인
          </button>
        </div>
      </div>
      {inputObject.map((input) => (
        <div className="space-y-2" key={input.id}>
          <label htmlFor={input.id} className="text-sm font-semibold">
            {input.label}
          </label>
          <input
            type={input.type}
            className={inputStyle}
            id={input.id}
            placeholder={input.placeholder}
          />
          <p className={signupValidationStyle}>{input.validation}</p>
        </div>
      ))}
      <button className="w-full bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md font-semibold">
        회원가입 완료
      </button>

      <div className="flex justify-center mt-5">
        <p className="text-sm text-gray-400 font-semibold">SNS 간편 회원가입</p>
      </div>
      <div className="w-[400px] mx-auto flex gap-2 justify-around mt-5">
        <button className="text-red-500">구글</button>
        <button className="text-green-500">네이버</button>
        <button className="text-yellow-500">카카오</button>
        <button className="text-blue-500">디스코드</button>
      </div>
      <div className="flex justify-around text-gray-500 text-sm font-semibold mt-5">
        <Link href="/" className="underline hover:text-gray-600">
          1:1 문의하기
        </Link>
      </div>
    </div>
  );
};
