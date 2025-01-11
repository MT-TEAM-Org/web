import Link from "next/link";

interface AccountHelpProps {
  signState: "login" | "signup";
}

const AccountHelp = ({ signState }: AccountHelpProps) => {
  return (
    <div
      className={`flex ${
        signState === "login" ? "gap-[16px]" : "gap-0"
      } mt-[24px] underline text-[14px] text-[#000000] opacity-[70%] text-center`}
    >
      <Link
        href="/"
        className={`${
          signState === "login"
            ? "w-1/2 leading-[18px]"
            : "w-full leading-[18px]"
        }`}
      >
        1:1 문의하기
      </Link>
      {signState === "login" && (
        <Link href="/" className="w-1/2 leading-[18px]">
          아이디/비밀번호 찾기
        </Link>
      )}
    </div>
  );
};

export default AccountHelp;
