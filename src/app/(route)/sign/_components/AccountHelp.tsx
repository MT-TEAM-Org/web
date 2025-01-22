"use client";

import ModalPopup from "@/app/_components/ModalPopup";
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
      } mt-[24px] underline text-[14px] text-[#000000] ${
        show ? "opacity-100" : "opacity-[70%]"
      } text-center`}
    >
      <button
        type="button"
        className={`focus:border-none ${
          signState === "login"
            ? "w-1/2 leading-[18px]"
            : "w-full leading-[18px]"
        }`}
        onClick={() => setShow(true)}
      >
        1:1 문의하기
      </button>
      {signState === "login" && (
        <Link href="/" className="w-1/2 leading-[18px]">
          아이디/비밀번호 찾기
        </Link>
      )}
      <ModalPopup show={show} setShow={setShow} />
    </div>
  );
};

export default AccountHelp;
