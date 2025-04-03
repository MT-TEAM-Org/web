"use client";

import GuestModalPopup from "@/app/_components/GuestModalPopup";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AccountHelpProps {
  signState: "login" | "signup";
}

const AccountHelp = ({ signState }: AccountHelpProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [show]);

  return (
    <div
      className={`flex ${
        signState === "login" ? "gap-[16px]" : "gap-0"
      } underline text-[14px] text-[#000000] ${
        show ? "opacity-100" : "opacity-[70%]"
      }`}
    >
      <button
        type="button"
        className={`focus:border-none leading-[18px] h-[34px] ${
          signState === "login" ? "w-[156px]" : "w-full"
        }`}
        onClick={() => setShow(true)}
      >
        1:1 문의하기
      </button>
      {signState === "login" && (
        <Link href="/sign/find-account">
          <button className="w-[156px] h-[34px] leading-[18px] underline">
            아이디/비밀번호 찾기
          </button>
        </Link>
      )}
      <GuestModalPopup setShow={setShow} show={show} />
    </div>
  );
};

export default AccountHelp;
