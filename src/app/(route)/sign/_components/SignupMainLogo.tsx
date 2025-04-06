import { SymbolLogo } from "../_components/SymbolLogo";
import { Google } from "@/app/_components/icon/Google";
import { Naver } from "@/app/_components/icon/Naver";
import { Kakao } from "@/app/_components/icon/Kakao";
import { Discord } from "@/app/_components/icon/Discord";

interface SignupMainLogoProps {
  logo: "구글" | "네이버" | "카카오" | "디스코드" | "기본";
}

const SignupMainLogo = ({ logo }: SignupMainLogoProps) => {
  const logoObject = {
    구글: <Google />,
    네이버: <Naver />,
    카카오: <Kakao />,
    디스코드: <Discord />,
    기본: <SymbolLogo />,
  };
  const currentLogo = logoObject[logo] || logoObject["기본"];
  const headTextSign = () => {
    switch (logo) {
      case "구글":
        return "구글 SNS 간편 회원가입";
      case "네이버":
        return "네이버 SNS 간편 회원가입";
      case "카카오":
        return "카카오 SNS 간편 회원가입";
      case "디스코드":
        return "디스코드 SNS 회원가입";
      default:
        return "플레이하이브 일반 회원가입";
    }
  };

  return (
    <div className="flex flex-col items-center gap-[8px] min-h-[86px]">
      <div className="flex justify-center items-center w-[52px] h-[52px] bg-[#FAFAFA] rounded-full border-[1px] border-[#EEEEEE]">
        {currentLogo}
      </div>
      <p className="font-[700] text-[16px] leading-[26px] text-[#424242]">
        {headTextSign()}
      </p>
    </div>
  );
};

export default SignupMainLogo;
