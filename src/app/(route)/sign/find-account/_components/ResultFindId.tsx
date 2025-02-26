import SnsButtons from "../../_components/SnsButtons";
import AccountHelp from "../../_components/AccountHelp";
import Link from "next/link";

interface FindId {
  email: string;
  type: "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE | DISCORD";
}

interface ResultFindIdProps {
  findId: FindId;
}

const ResultFindId = ({ findId }: ResultFindIdProps) => {
  const { email, type } = findId;
  const userType = {
    LOCAL: "일반 회원가입",
    KAKAO: "SNS 회원가입 (카카오)",
    NAVER: "SNS 회원가입 (네이버)",
    GOOGLE: "SNS 회원가입 (구글)",
  };

  const resultText = [
    { label: "가입 유형", value: userType[type] },
    { label: "가입 아이디", value: email },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="space-y-[8px] py-[24px]">
        <h1 className="text-[18px] leading-[28px] text-center text-gray8">
          회원님의 아이디는 아래와 같습니다.
        </h1>
        <div className="min-h-[84px] rounded-[10px] p-[16px] bg-[#FAFAFA] space-y-[4px]">
          {resultText.map((item) => (
            <div key={item.label} className="flex justify-between">
              <p className="leading-[24px] text-gray8">{item.label}</p>
              <p className="font-[700] leading-[24px] text-gray8">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Link href="/sign">
        <button
          type="button"
          className="w-full defaultButtonColor text-white rounded-[5px] px-[20px] py-[16px] font-[700] leading-[16px]"
        >
          로그인 하기
        </button>
      </Link>
      <SnsButtons signState="login" />
      <AccountHelp signState="signup" />
    </div>
  );
};

export default ResultFindId;
