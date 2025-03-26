import React from "react";
import ServiceItem from "./_components/ServiceItem";
import Image from "next/image";
import ServiceBenefitItem from "./_components/ServiceBenefitItem";
import DoubleLogo from "@/app/_components/icon/Service_DoubleLogo";
import Service_PlayHive from "@/app/_components/icon/Service_PlayHive";
import Link from "next/link";

export const metadata = {
  title: "PlayHive 서비스소개 페이지",
  description: "PlayHive 서비스소개 페이지입니다.",
};

const Page = () => {
  const serviceItems = [
    {
      imgUrl: "Service_feature_1",
      title: "경기중계와 실시간 채팅",
      content: "팬들과 함께 경기 라인업, 기록 등을 보며 즐겁게 소통하는 채팅",
    },
    {
      imgUrl: "Service_feature_2",
      title: "안전한 커뮤니티 운영",
      content: "신고 시스템, 비속어 필터링으로 지속관리 관리자의 모니터링까지",
    },
    {
      imgUrl: "Service_feature_3",
      title: "건강한 응원 문화",
      content:
        "비방,악성 댓글 없는 클린지향주의 서로를 존중할 자세가 있다면 컴온!",
    },
    {
      imgUrl: "Service_feature_4",
      title: "다양한 카테고리 게시판",
      content: "E스포츠, 축구, 야구 등의 다양한 허브 니즈에 따라 추가제공 가능",
    },
    {
      imgUrl: "Service_feature_5",
      title: "승부예측",
      content: "과연 누가 이길까? 나의 팀을 응원하고 예측하는 재미!",
    },
    {
      imgUrl: "Service_feature_6",
      title: "실시간 뉴스기사",
      content: "최신 뉴스 기사와 함께 토론해볼수 있는 이야기 소통 공간 제공",
    },
  ];

  const serviceBenefits = [
    {
      content: "건강한 스포츠 토론을 즐기고 싶은 분!",
      imgLink: "Service_benefit_1",
    },
    {
      content: "경기 중 실시간으로 의견을 나누고 싶은 분!",
      reverse: true,
      imgLink: "Service_benefit_2",
    },
    {
      content: "관심 있는 팀과 선수 소식을 빠르게 공유!",
      imgLink: "Service_benefit_3",
    },
    {
      content: "팬들과 함께 승리의 순간을 공유하는 즐거움!",
      reverse: true,
      imgLink: "Service_benefit_4",
    },
  ];

  const benefitImages = [
    {
      src: "/Service_benefit2_3.png",
      width: 193,
      height: 193,
      className: "absolute top-[315px] left-[76px] rounded-[25px] opacity-50",
      shadowClass: "shadow-sm",
      zIndex: "z-0",
    },
    {
      src: "/Service_benefit2_1.png",
      width: 316,
      height: 316,
      className: "absolute top-[80px] left-[5px] rounded-[25px]",
      shadowClass: "shadow-lg",
      zIndex: "z-10",
    },
    {
      src: "/Service_benefit2_2.png",
      width: 293,
      height: 274,
      className: "absolute top-[175px] left-[180px] rounded-[25px] opacity-95",
      shadowClass: "shadow-md",
      zIndex: "z-20",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full h-[480px] flex items-center justify-center bg-gradient-to-r from-[#00ADEE] to-[#006388]">
        {/* 애니메이션 들어갈 부분 */}
        <div className="w-[520px] min-h-[296px] rounded-[20px] p-10 flex gap-6 shadow-sm bg-white z-10">
          <div className="w-full min-h-[216px] flex flex-col gap-6">
            <div className="w-full min-h-[60px] items-center text-center font-bold text-[28px] leading-10 tracking-[-0.04em]">
              <h1 className="text-gray9">스포츠팬 여러분!</h1>
              <h1>
                이제 <span className="text-gra">플레이하이브</span>에서 함께
                응원하세요!
              </h1>
            </div>
            <p className="text-center text-[18px] leading-7 text-gray7 tracking-[-0.04em]">
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
            <p className="font-extrabold text-[20px] leading-[26px] tracking-[-0.02em] text-center text-gra">
              Features
            </p>
            <p className="font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-center text-black">
              서로 존중하는 커뮤니티, 플레이하이브
            </p>
          </div>
          <div className="w-full min-h-[624px] flex flex-col items-center gap-6">
            <div className="min-w-[1008px] min-h-[300px] flex gap-6">
              {serviceItems.slice(0, 3).map((item) => (
                <ServiceItem key={item.imgUrl} {...item} />
              ))}
            </div>
            <div className="min-w-[1008px] min-h-[300px] flex gap-6">
              {serviceItems.slice(3).map((item) => (
                <ServiceItem key={item.imgUrl} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[488px] py-[60px] flex gap-[10px] items-center justify-center bg-bg0">
        <div className="w-[1200px] min-h-[368px] flex justify-between items-center">
          <div className="w-[560px] min-h-[294px] flex gap-6 flex-col">
            <div className="w-full h-[158px] flex flex-col gap-1">
              <p className="font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-gra">
                benefits 1
              </p>
              <p className="font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black">
                플레이하이브에서 소통한다면 다양한 즐거운 경험들을 얻어요.
              </p>
            </div>
            <p className="text-[18px] leading-7 tracking-[-0.04em] text-gray7">
              플레이 하이브는 유저분들의 자유롭고 즐거운 토론과 소통을 위해서
              직관적이고 커뮤니티에 집중할 수 있는 UIUX 디자인을 제공하고
              있습니다. 또한 실시간 경기중계를 보면서 함께 채팅을 나눌수 있는
              경기 중계 페이지를 통해서도 팬심을 드러내어 응원을 열심히
              해보세요.
            </p>
          </div>
          <div className="max-w-[640px] min-h-[368px] flex gap-4 flex-col items-center justify-center">
            {serviceBenefits.map((item, index) => (
              <ServiceBenefitItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full min-h-[600px] py-[60px] flex gap-[10px] bg-[#FFFFFF] items-center justify-center">
        <div className="w-[1200px] min-h-[480px] flex justify-between items-center">
          <div className="relative w-[464.42px] h-[480px]">
            {benefitImages.map((image, index) => (
              <div key={index} className={image.shadowClass}>
                <Image
                  src={image.src}
                  alt="Service benefit2 img"
                  width={image.width}
                  height={image.height}
                  className={`${image.className} ${image.zIndex}`}
                />
              </div>
            ))}
          </div>
          <div className="w-[560px] min-h-[294px] flex gap-6 flex-col">
            <div className="w-full h-[158px] flex gap-1 flex-col">
              <p className="font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-gra">
                benefits 2
              </p>
              <p className="font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black">
                좋아하는 스포츠 선수를 함께 응원한다면 더 즐거워요!
              </p>
            </div>
            <p className="font-medium text-[18px] leading-7 tracking-[-0.04em] text-gray7">
              페이커, 손흥민, 오타니, T1, 젠지, 토트넘 등.. 좋아하는 팀이나
              선수가 있으신가요? 추천시스템을 통해서 서로를 존중해주는 응원
              문화를 지향합니다. 따라서 팬인 선수나 팀에 대한 정보 공유, 응원
              게시글 등을 통하여 다양한 지식을 넓히고 쌓아갈 수 있습니다. 이른
              바 덕업일치 실현을 해볼 때 입니다.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[360px] flex items-center justify-center bg-[url('/Service_footer.png')] bg-center bg-cover relative">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="min-w-[558px] min-h-[232px] flex gap-6 flex-col items-center justify-center relative z-10">
          <div className="min-w-[558px] min-h-[156px] flex flex-col items-center justify-center gap-6">
            <div className="min-h-[80px] flex items-center gap-[10px]">
              <DoubleLogo />
              <Service_PlayHive />
            </div>
            <p className="font-bold text-[36px] leading-[52px] tracking-[-0.02em] text-white">
              &quot;여러분의 스포츠 이야기를 들려주세요!”
            </p>
          </div>
          <Link href={"/sign"}>
            <button className="w-[160px] h-[52px] rounded-[5px] px-[22px] py-[18px] flex gap-[10px] bg-gra text-white items-center justify-center">
              로그인/회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
