import React from "react";

const TermsOfService = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b bg-[#FFFFFF] flex flex-col shadow-md">
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center border-[#EEEEEE] bg-[#F9F9F9]">
        <h1 className="font-bold text-[18px] leading-7 text-[#303030]">
          이용약관
        </h1>
      </div>
      <div className="w-full p-6">
        <div className="text-[14px] leading-[22px] tracking-[-0.02em] text-[#656565] space-y-6">
          <ol className="list-decimal pl-5 space-y-4">
            <li className="space-y-3">
              <strong className="text-[#303030]">제1조 목적</strong>
              <p>
                이 약관은 &quot;플레이하이브&quot;(이하 &quot;회사&quot;)가
                서비스하는 PLAYHIVE의 이용조건 및 절차를 규정함을 목적으로
                합니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">
                제2조 약관의 공지 및 효력
              </strong>
              <p>
                본 약관의 내용은 서비스 화면에 게시하거나 기타 방법으로
                공지함으로써 효력이 발생합니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제3조 약관 외 준칙</strong>
              <p>
                본 약관에 명시되지 않은 사항은 관계법령 및 상관례에 따릅니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제4조 이용계약의 성립</strong>
              <p>
                이용자가 이용 신청 시 &quot;동의함&quot; 버튼을 누르면 본 약관에
                동의한 것으로 간주됩니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">
                제5조 이용신청의 승낙 및 제한
              </strong>
              <p>
                회사는 이용신청서의 내용을 허위로 기재한 경우 등의 사유로 승낙을
                거부할 수 있습니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제6조 개인정보 보호</strong>
              <p>
                회사는 이용자의 개인정보를 수집할 때 반드시 본인의 동의를
                받으며, 보호 조치를 강구합니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제7조 서비스 제공</strong>
              <p>
                회사는 24시간 365일 서비스를 제공하며, 유지보수를 위해
                일시적으로 중단될 수 있습니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제8조 손해배상 및 면책</strong>
              <p>
                회사는 무료로 제공되는 서비스에 대해 손해배상을 책임지지
                않습니다.
              </p>
            </li>
            <li className="space-y-3">
              <strong className="text-[#303030]">제9조 관할법원</strong>
              <p>
                서비스 이용 중 발생한 분쟁에 대한 소송은 회사의 본사 소재지를
                관할하는 법원으로 합니다.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
