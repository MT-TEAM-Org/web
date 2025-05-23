"use client";

import { Discord } from "@/app/_components/icon/Discord";
import { Google } from "@/app/_components/icon/Google";
import { Kakao } from "@/app/_components/icon/Kakao";
import { Naver } from "@/app/_components/icon/Naver";
import { useRouter } from "next/navigation";

interface SnsButtonsProps {
  signState: "login" | "signup";
}

const SnsButtons = ({ signState }: SnsButtonsProps) => {
  const router = useRouter();

  const snsButtonObject = [
    // {
    //   name: "naver" as "naver",
    //   icon: <Naver />,
    //   link: `${process.env.NEXT_PUBLIC_API_URL}oauth2/authorization/naver`,
    // },
    // {
    //   name: "kakao" as "kakao",
    //   icon: <Kakao />,
    //   link: `${process.env.NEXT_PUBLIC_API_URL}oauth2/authorization/kakao`,
    // },
    {
      name: "google" as "google",
      icon: <Google />,
      link: `${process.env.NEXT_PUBLIC_API_URL}oauth2/authorization/google`,
    },
    {
      name: "discord" as "discord",
      icon: <Discord />,
      link: `${process.env.NEXT_PUBLIC_API_URL}oauth2/authorization/discord`,
    },
  ];

  const handleSnsRoute = (sns: "google" | "naver" | "kakao" | "discord") => {
    router.push(
      `${process.env.NEXT_PUBLIC_API_URL}oauth2/authorization/${sns}`
    );
  };

  const snsGrayLine = () => {
    return <div className="w-[117px] h-[1px] border-[1px] border-[#EEEEEE]" />;
  };

  return (
    <div>
      <div className="flex items-center min-h-[18px] gap-[8px]">
        {snsGrayLine()}
        <p className="w-[78px] text-center text-[12px] text-[#000000] opacity-[50%] leading-[18px] whitespace-nowrap tracking-[-0.02em]">
          {signState === "login" ? "SNS 간편로그인" : "SNS 간편 회원가입"}
        </p>
        {snsGrayLine()}
      </div>
      <div className="flex justify-center gap-[24px] mt-[8px]">
        {snsButtonObject.map((snsButton) => (
          <button
            type="button"
            onClick={() => {
              handleSnsRoute(snsButton.name);
            }}
            className="w-[52px] h-[52px] flex justify-center items-center p-[10px] border-[1px] bg-[#FAFAFA] border-[#EEEEEE] rounded-full"
            key={snsButton.name}
          >
            {snsButton.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SnsButtons;
