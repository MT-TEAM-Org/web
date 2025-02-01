import React from "react";

const PrivacyPolicyTab = () => {
  return (
    <div className="max-w-[1200px] w-full min-h-[440px] h-full flex flex-col gap-4 p-10 bg-[#FAFAFA]">
      <div className="w-[1120px] h-[36px] font-[500] text-[20px] leading-9">
        <h1>개인정보 취급방침</h1>
      </div>
      <div className="w-[1120px] h-[308px] flex text-start font-[500] text-[14px] leading-[22px] tracking-[-0.02em] text-[#656565]">
        <ul className="list-disc list-outside pl-5">
          <li>개인정보처리방침</li>
          <li>
            본 개인정보처리방침은 ㈜오피지지(이하 “회사”라 합니다)가 제공하는
            서비스(이하 “서비스”)의 이용과 관련하여, 회사의 회원으로 가입한 뒤
            서비스를 이용하는 회원(이하 “회원”)로부터 수집하는 개인정보 및 그
            개인정보의 사용방법 등에 관한 제반사항을 규정하기 위해
            준비되었습니다.
          </li>
          <li>
            본 개인정보처리방침은 회사의 재량에 따라 별도 고지 없이 변경될 수
            있습니다.
          </li>
          <li>회사가 제공하는 서비스</li>
          <li>
            회사는 회원에게 아래와 같은 서비스를 제공합니다.
            <ol className="list-[lower-alpha] pl-4">
              <li>
                다음 각 호 기재와 같은 「 
                <span className="text-black underline decoration-solid decoration-skip-ink-none"> https://www.op.gg </span>」 및 「 
                <span className="text-black underline decoration-solid decoration-skip-ink-none"> https://www.op.gg </span>」 의 하위
                정보통신망의 유지 및 운영 서비스
                <ol className="list-[lower-roman] pl-4">
                  <li className="underline decoration-solid decoration-skip-ink-none">https://www.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://tft.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://valorant.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://pubg.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://overwatch.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://talk.op.gg</li>
                  <li className="underline decoration-solid decoration-skip-ink-none">https://news.op.gg</li>
                </ol>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicyTab;
