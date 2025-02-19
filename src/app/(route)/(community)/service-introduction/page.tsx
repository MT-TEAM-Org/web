import React from "react";
import ServiceItem from "./_components/ServiceItem";

const Page = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[480px] bg-blue-300 flex items-center justify-center">
        <div className="w-[520px] min-h-[296px] rounded-[20px] p-10 flex gap-6 shadow-sm bg-white">
          <div className="w-full min-h-[216px] flex flex-col gap-6">
            <div className="w-full min-h-[60px] items-center text-center font-bold text-[28px] leading-10 tracking-[-0.04em]">
              <h1>스포츠팬 여러분!</h1>
              <h1>
                이제 <span className="text-[#00ADEE]">플레이하이브</span>에서
                함께 응원하세요!
              </h1>
            </div>
            <p className="text-center text-[18px] leading-7 text-[#424242] tracking-[-0.04em]">
              우리는 스포츠 팬들이 서로 존중하며 소통할 수 있는 공간을 만듭니다.
              플하는 팬덤 문화를 선도하는 새로운 플랫폼입니다. 내가 응원하는 팀,
              선수에 대한 정보를 실시간으로 확인하고, 다른 팬들과 자유롭게
              소통하며, 다양한 콘텐츠를 함께 만들어갈 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[902px] py-[80px] flex items-center justify-center gap-6">
        <div className="w-[1200px] min-h-[742px] flex flex-col items-center justify-center gap-6">
          <div className="min-w-[621px] min-h-[94px] flex flex-col gap-1">
            <p className="font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-center text-[#00ADEE]">
              Features
            </p>
            <p className="font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-center">
              서로 존중하는 커뮤니티, 플레이하이브
            </p>
          </div>
          <div className="w-full min-h-[624px] flex flex-col items-center gap-6">
            <div className="min-w-[1008px] min-h-[300px] flex gap-6">
              <ServiceItem
                title="경기중계와 실시간 채팅"
                content="팬들과 함께 경기 라인업, 기록 등을 보며 즐겁게 소통하는 채팅"
              />
              <ServiceItem
                title="안전한 커뮤니티 운영"
                content="신고 시스템, 비속어 필터링으로 지속관리 관리자의 모니터링까지"
              />
              <ServiceItem
                title="건강한 응원 문화"
                content="비방,악성 댓글 없는 클린지향주의 서로를 존중할 자세가 있다면 컴온!"
              />
            </div>
            <div className="min-w-[1008px] min-h-[300px] flex gap-6">
              <ServiceItem
                title="다양한 카테고리 게시판"
                content="E스포츠, 축구, 야구 등의 다양한 허브 니즈에 따라 추가제공 가능"
              />
              <ServiceItem
                title="승부예측"
                content="과연 누가 이길까? 나의 팀을 응원하고 예측하는 재미!"
              />
              <ServiceItem
                title="실시간 뉴스기사"
                content="최신 뉴스 기사와 함께 토론해볼수 있는 이야기 소통 공간 제공"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
