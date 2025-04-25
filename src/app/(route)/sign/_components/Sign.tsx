"use client";

import { Suspense } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import useRouteHome from "@/_hooks/fetcher/mypage/useRouteHome";

interface Tabs {
  id: "login" | "signup";
  label: "로그인" | "회원가입";
}

function Sign() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginSignupState = searchParams.get("sign") || "login";
  useRouteHome(true);

  const tabs: Tabs[] = [
    { id: "login", label: "로그인" },
    { id: "signup", label: "회원가입" },
  ];

  const loginSignupStyle =
    "w-1/2 flex items-center justify-center rounded-t-[5px] cursor-pointer border-gray-600 border-[#303030] text-[#424242]";
  return (
    <div
      className={cn(
        "w-[328px] min-h-[480px] mx-auto mt-[40px] select-none",
        "mobile:mt-[16px]"
      )}
    >
      <div className="w-full min-h-[52px] flex">
        {tabs.map(({ id, label }) => (
          <div
            key={id}
            className={`${loginSignupStyle} ${
              loginSignupState === id
                ? "border-[1px] border-b-0 font-[700]"
                : "border-b text-[#A6A6A6] border-[#A6A6A6]"
            }`}
            onClick={() => router.push(`/sign/?sign=${id}`)}
          >
            {label}
          </div>
        ))}
      </div>
      {loginSignupState === "login" ? <Login /> : <Signup />}
    </div>
  );
}

const SignSuspense = () => {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-516px)]",
        "tablet:min-h-[calc(100vh-592.67px)] tablet:mb-[37px]",
        "mobile:h-full"
      )}
    >
      <Suspense fallback={""}>
        <Sign />
      </Suspense>
    </div>
  );
};

export default SignSuspense;
