import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/sign">
      <button className="w-[124px] min-h-[40px] py-[13px] px-[16px] rounded-[5px] defaultButtonColor defaultButtonColor:hover text-white font-bold text-[14px] leading-[14px] whitespace-nowrap">
        로그인/회원가입
      </button>
    </Link>
  );
};

export default LoginButton;
