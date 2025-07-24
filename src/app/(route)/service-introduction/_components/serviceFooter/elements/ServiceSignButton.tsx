import React from "react";
import Link from "next/link";
import { cn } from "@/utils";

const ServiceSignButton = () => {
  return (
    <Link
      href={"/sign"}
      className={cn(
        "w-[160px] h-[52px] rounded-[5px] px-[22px] py-[18px] flex gap-[10px] bg-gra text-white items-center justify-center",
        "mobile:w-[120px] mobile:h-[40px] mobile:text-[14px] mobile:whitespace-nowrap"
      )}
    >
      로그인/회원가입
    </Link>
  );
};

export default ServiceSignButton;
