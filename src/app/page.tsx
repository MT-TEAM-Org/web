"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
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

  const fetchSignup = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/me/create`,
        signupValue
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
    console.log(signupValue);
    fetchSignup().then((data) => {
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
    "w-1/2 h-[60px] flex items-center justify-center rounded-t-md cursor-pointer border-gray-600";

  return (
    <div className="w-[600px] mx-auto mt-10 h-[2000px]">
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

const Login = ({ setLoginValue }: any) => {
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
            onChange={(e) =>
              setLoginValue((prev: any) => ({
                ...prev,
                [input.id]: e.target.value,
              }))
            }
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

interface SignupValue {
  email: string;
  password: string;
  tel: string;
  nickname: string;
  gender: string;
}

interface SignupProps {
  setSignupValue: React.Dispatch<React.SetStateAction<SignupValue>>;
}

const Signup = ({ setSignupValue }: SignupProps) => {
  const inputObject = [
    {
      label: "비밀번호",
      type: "password",
      id: "password",
      placeholder: "비밀번호를 입력해주세요.",
      validation: "영문+숫자 조합 4자~10자 이내",
    },
    {
      label: "이름",
      type: "text",
      id: "name",
      placeholder: "이름",
      validation: "이름을 입력해주세요.",
    },
    {
      label: "핸드폰 번호",
      type: "number",
      id: "tel",
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
    {
      label: "생년월일",
      type: "date",
      id: "birthdate",
      placeholder: "생년월일을 입력해주세요.",
      validation: "YYYY-MM-DD 형식으로 입력해주세요.",
    },
    {
      label: "성별",
      type: "text",
      id: "gender",
      placeholder: "성별",
      validation: "성별을 입력해주세요.",
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
            onChange={(e) =>
              setSignupValue((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            className={inputStyle}
            id="email"
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
            onChange={(e) =>
              setSignupValue((prev) => ({
                ...prev,
                [input.id]: e.target.value,
              }))
            }
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
