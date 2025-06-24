import Icon from "@/app/_components/IconComponents/Icon";
import React from "react";

const style = {
  label: "font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7",
  input:
    "w-full h-[48px] rounded-[5px] border px-4 py-3 border-gray3 text-black",
};

const Page = () => {
  return (
    <div className="w-[400px] min-h-[412px] rounded-[20px] p-10 flex flex-col gap-6 bg-white">
      <div className="min-w-[320px] h-[64px] p-4 flex gap-4">
        <Icon icon="ADMIN_LOGO" />
      </div>
      <form
        action=""
        className="flex flex-col items-start justify-center gap-6"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email" className={style.label}>
            이메일 아이디
          </label>
          <input
            type="text"
            id="email"
            placeholder="아이디를 입력해주세요."
            className={style.input}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password" className={style.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            className={style.input}
          />
        </div>
      </form>
      <button
        type="submit"
        className="min-w-[320px] h-[48px] rounded-[5px] bg-gra font-bold text-[16px] text-white"
      >
        로그인
      </button>
    </div>
  );
};

export default Page;
