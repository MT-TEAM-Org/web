import React from "react";

const PrivacyPolicyTab = () => {
  return (
    <div>
      <div className="max-w-[1200px] min-h-[440px] h-auto flex flex-col gap-4 items-center justify-center p-10 bg-[#FAFAFA]">
        <div className="w-[1120px] h-[36px] font-[500] text-[20px] leading-[36px]">
          <h1>이용약관</h1>
        </div>
        <div className="w-[1120px] h-[308px] font-[500] text-[14px] leading-[22px]">
          <div>
            <p>수집 및 이용목적</p>
            <p>상품 예약 및 확인, 관련 문의 응대</p>
          </div>
          <div>
            <p>수집 항목</p>
            <p>예약자정보 : 이름, 연락처, 이메일</p>
            <p>숙박자정보 : 이름(영문), 나이(아동만 해당)</p>
          </div>
          <div>
            <p>
              보유 및 이용기간 예약 서비스 제공 완료 후 1년 (단,관계법령에 의해
              보존할 경우 그에 따른 보존기간) 수집 및 이용목적
            </p>
          </div>
          <div>
            <p>상품 예약 및 확인, 관련 문의 응대</p>
          </div>
          <div>
            <p>수집 항목 예약자정보 : 이름,연락처, 이메일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyTab;
