"use client";

import Link from "next/link";

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

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#A6A6A6] leading-[22px] font-[500] text-[14px]";
  return (
    <div className="space-y-[24px]">
      {inputObject.map((input) => (
        <div className="space-y-[4px]" key={input.id}>
          <label
            htmlFor={input.id}
            className="text-[14px] font-[500] leading-[22px] text-[#424242]"
          >
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
      <button className="w-full h-[48px] bg-[#00ADEE] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700]">
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

export default Login;
