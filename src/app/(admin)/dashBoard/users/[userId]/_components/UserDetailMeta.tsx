import RadioGroup from "@/app/(admin)/_components/search/RadioGroup";
import MetaPanelField from "@/app/(admin)/_components/userDetail/MetaPanelField";
import { cn } from "@/utils";
import React from "react";

const UserDetailMeta = () => {
  // 왼쪽 패널 데이터
  const leftPanelData = [
    { name: "닉네임", value: "김땡땡" },
    { name: "이메일", value: "asdf@gmail.com" },
    { name: "휴대폰번호", value: "01051512122" },
    { name: "성별", value: "-" },
    { name: "가입경로", value: "일반" },
    { name: "생년월일", value: "991211" },
    { name: "가입일자", value: "2025.07.17" },
    {
      name: "최근 접속",
      value: "2025.05.05 / 18:24:32",
      subValue: "(IP 106.101.44.321)",
    },
  ];

  // 오른쪽 패널 데이터
  const rightPanelData = [
    { name: "받은 추천수", value: "125" },
    { name: "방문수", value: "44" },
    { name: "개선요청", value: "8" },
    { name: "댓글", value: "33" },
    { name: "채팅", value: "12" },
    { name: "채팅", value: "568" },
    {
      name: "신고",
      value: "165(받은 신고수), 12(보낸 신고수)",
      style: "text-warning",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex">
        {/* 왼쪽 패널 */}
        <div className="w-1/2">
          {leftPanelData.map((item, index) => (
            <MetaPanelField
              key={index}
              item={{ ...item, className: "border-r-0" }}
            />
          ))}
        </div>

        {/* 오른쪽 패널 */}
        <div className="w-1/2">
          {rightPanelData.map((item, index) => (
            <MetaPanelField key={index} item={item} />
          ))}

          {/* 회원 상태 라디오 그룹 */}
          <RadioGroup
            label="회원 상태"
            name="userStatus"
            type="radio"
            className="h-[40px] border border-gray2 border-b-0"
            options={[
              { id: "normal", label: "정상" },
              { id: "warning", label: "경고" },
              { id: "stop", label: "정지" },
            ]}
          />
        </div>
      </div>

      {/* 답변 텍스트 영역 */}
      <div className="w-full min-h-[56px] flex items-center border border-gray2">
        <p className="w-[100px] self-stretch px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
          답변
        </p>
        <div className="flex-1 px-4 py-2">
          <textarea
            placeholder="내용을 입력해 주세요. (ex. 회원상태 변동이유)"
            className={cn(
              "w-full max-w-[600px] h-[40px] rounded-[5px] border px-3 py-2 bg-white border-gray3 resize-none flex items-center justify-start",
              "placeholder:text-gray5 placeholder:tracking-[-0.02em] placeholder:leading-[22px] placeholder:text-[14px] placeholder:font-medium"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailMeta;
