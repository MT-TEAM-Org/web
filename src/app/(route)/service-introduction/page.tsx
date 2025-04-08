import React from "react";
import ServiceItem from "./_components/ServiceItem";
import Image from "next/image";
import ServiceBenefitItem from "./_components/ServiceBenefitItem";
import DoubleLogo from "@/app/_components/icon/Service_DoubleLogo";
import Service_PlayHive from "@/app/_components/icon/Service_PlayHive";
import Link from "next/link";
import { cn } from "@/utils";

export const metadata = {
  title: "PlayHive 서비스소개 페이지",
  description: "PlayHive 서비스소개 페이지입니다.",
};

const Page = () => {
  const serviceItems = [
    {
      imgUrl: "Service_feature_1",
      title: "경기중계와 실시간 채팅",
      content: "팬들과 함께 경기 라인업, 기록 등을 보며\n 즐겁게 소통하는 채팅",
    },
    {
      imgUrl: "Service_feature_2",
      title: "안전한 커뮤니티 운영",
      content:
        "신고 시스템, 비속어 필터링으로 지속관리\n 관리자의 모니터링까지",
    },
    {
      imgUrl: "Service_feature_3",
      title: "건강한 응원 문화",
      content:
        "비방,악성 댓글 없는 클린지향주의\n 서로를 존중할 자세가 있다면 컴온!",
    },
    {
      imgUrl: "Service_feature_4",
      title: "다양한 카테고리 게시판",
      content:
        "E스포츠, 축구, 야구 등의 다양한 허브\n 니즈에 따라 추가제공 가능",
    },
    {
      imgUrl: "Service_feature_5",
      title: "승부예측",
      content: "과연 누가 이길까?\n 나의 팀을 응원하고 예측하는 재미!",
    },
    {
      imgUrl: "Service_feature_6",
      title: "실시간 뉴스기사",
      content: "최신 뉴스 기사와 함께 토론해볼수 있는\n 이야기 소통 공간 제공",
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
      className: cn(
        "absolute top-[315px] left-[76px] rounded-[25px] opacity-50",
        "tablet:w-[243px] tablet:h-[223px] tablet:top-[300px] tablet:left-[60px]",
        "mobile:w-[150px] mobile:h-[150px] mobile:top-[200px] mobile:left-[20px]"
      ),
      shadowClass: "shadow-sm",
      zIndex: "z-0",
    },
    {
      src: "/Service_benefit2_1.png",
      width: 316,
      height: 316,
      className: cn(
        "absolute top-[80px] left-[5px] rounded-[25px]",
        "tablet:w-[436px] tablet:h-[436px] tablet:top-[0px] tablet:left-[-100px]",
        "mobile:w-[280px] mobile:h-[280px] mobile:top-[10px] mobile:left-[-60px]"
      ),
      shadowClass: "shadow-lg",
      zIndex: "z-10",
    },
    {
      src: "/Service_benefit2_2.png",
      width: 293,
      height: 274,
      className: cn(
        "absolute top-[175px] left-[180px] rounded-[25px] opacity-95",
        "tablet:w-[400px] tablet:h-[400px] tablet:top-[120px] tablet:left-[170px]",
        "mobile:w-[240px] mobile:h-[240px] mobile:top-[90px] mobile:left-[90px]"
      ),
      shadowClass: "shadow-md",
      zIndex: "z-20",
    },
  ];

  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "w-full h-[480px] flex items-center justify-center bg-gradient-to-r from-gra to-[#006388]",
          "mobile:h-[236px]"
        )}
      >
        {/* 애니메이션 들어갈 부분 */}
        <div
          className={cn(
            "w-[520px] min-h-[296px] rounded-[20px] p-10 flex gap-6 shadow-sm bg-white z-10",
            "mobile:w-[264px] mobile:h-[188px] mobile:min-h-0 mobile:rounded-[5px] mobile:p-4 mobile:gap-2"
          )}
        >
          <div
            className={cn(
              "w-full min-h-[216px] flex flex-col gap-6",
              "mobile:gap-2"
            )}
          >
            <div
              className={cn(
                "w-full min-h-[60px] items-center text-center font-bold text-[28px] leading-10 tracking-[-0.04em]",
                "mobile:text-start mobile:text-[14px] mobile:leading-5 mobile:min-h-[40px]"
              )}
            >
              <h1 className="text-gray9">스포츠팬 여러분!</h1>
              <h1>
                이제 <span className="text-gra">플레이하이브</span>에서 함께
                응원하세요!
              </h1>
            </div>
            <p
              className={cn(
                "text-center text-[18px] leading-7 text-gray7 tracking-[-0.04em]",
                "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] mobile:text-start"
              )}
            >
              우리는 스포츠 팬들이 서로 존중하며 소통할 수 있는 공간을 만듭니다.
              플하는 팬덤 문화를 선도하는 새로운 플랫폼입니다. 내가 응원하는 팀,
              선수에 대한 정보를 실시간으로 확인하고, 다른 팬들과 자유롭게
              소통하며, 다양한 콘텐츠를 함께 만들어갈 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full min-h-[902px] py-[80px] flex items-center justify-center gap-6",
          "tablet:min-h-[1226px] tablet:px-10",
          "mobile:h-[790px] mobile:min-h-0 mobile:px-4 mobile:py-6"
        )}
      >
        <div
          className={cn(
            "w-full min-h-[742px] flex flex-col items-center justify-center gap-6",
            "tablet:h-[1066px] tablet:min-h-0",
            "mobile:h-[742px] mobile:min-h-0"
          )}
        >
          <div
            className={cn(
              "min-w-[621px] min-h-[94px] flex flex-col gap-1",
              "mobile:min-h-[46px]"
            )}
          >
            <p
              className={cn(
                "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-center text-gra",
                "mobile:text-[12px] mobile:leading-[18px]"
              )}
            >
              Features
            </p>
            <p
              className={cn(
                "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-center text-black",
                "mobile:text-[16px] mobile:leading-6"
              )}
            >
              서로 존중하는 커뮤니티, 플레이하이브
            </p>
          </div>
          <div
            className={cn(
              "grid grid-cols-3 gap-6",
              "tablet:min-w-[688px] tablet:min-h-[948px] tablet:grid-cols-2",
              "mobile:grid-cols-1"
            )}
          >
            {serviceItems.map((item) => (
              <ServiceItem key={item.imgUrl} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full min-h-[488px] py-[60px] flex gap-[10px] items-center justify-center bg-bg0",
          "tablet:min-h-[834px] tablet:px-[40px]",
          "mobile:min-h-[446px] mobile:px-4 mobile:py-6"
        )}
      >
        <div
          className={cn(
            "min-w-[1200px] min-h-[368px] flex justify-between items-center",
            "tablet:min-w-[688px] tablet:flex-col tablet:gap-[80px]",
            "mobile:min-w-[328px] mobile:min-h-[398px] mobile:flex-col mobile:gap-10"
          )}
        >
          <div
            className={cn(
              "w-[560px] min-h-[294px] flex gap-6 flex-col",
              "tablet:w-full tablet:min-h-[158px] tablet:order-2",
              "mobile:w-full mobile:min-h-[150px] mobile:order-2 mobile:gap-2"
            )}
          >
            <div
              className={cn(
                "w-full h-[158px] flex flex-col gap-1 font-bold tracking-[-0.02em]",
                "mobile:min-h-[70px] mobile:h-0"
              )}
            >
              <p
                className={cn(
                  "text-[20px] leading-[26px] text-gra",
                  "mobile:text-[12px] mobile:leading-[18px]"
                )}
              >
                benefits 1
              </p>
              <p
                className={cn(
                  "text-[42px] leading-[64px] text-black",
                  "tablet:hidden",
                  "mobile:hidden"
                )}
              >
                플레이하이브에서 소통한다면 다양한 즐거운 경험들을 얻어요.
              </p>
              <p
                className={cn(
                  "tablet:text-[42px] tablet:leading-[64px] text-black",
                  "mobile:text-[16px] mobile:leading-6",
                  "pc:hidden"
                )}
              >
                플레이하이브에서 소통한다면 <br /> 다양한 즐거운 경험들을
                얻어요.
              </p>
            </div>
            <p
              className={cn(
                "tablet:text-[18px] tablet:leading-7 tablet:tracking-[-0.04em] text-gray7",
                "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
              )}
            >
              플레이 하이브는 유저분들의 자유롭고 즐거운 토론과 소통을 위해서
              직관적이고 커뮤니티에 집중할 수 있는 UIUX 디자인을 제공하고
              있습니다. 또한 실시간 경기중계를 보면서 함께 채팅을 나눌수 있는
              경기 중계 페이지를 통해서도 팬심을 드러내어 응원을 열심히
              해보세요.
            </p>
          </div>
          <div
            className={cn(
              "max-w-[640px] min-h-[368px] flex gap-4 flex-col items-center justify-center",
              "tablet:w-full tablet:order-1",
              "mobile:w-full mobile:min-h-[208px] mobile:order-1"
            )}
          >
            {serviceBenefits.map((item, index) => (
              <ServiceBenefitItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full min-h-[600px] py-[60px] flex gap-[10px] bg-white items-center justify-center",
          "tablet:min-h-[974px] tablet:flex-col tablet:px-[40px]",
          "mobile:min-h-[619px] mobile:flex-col mobile:px-4 mobile:py-6"
        )}
      >
        <div
          className={cn(
            "w-[1200px] min-h-[480px] flex justify-between items-center",
            "tablet:w-full tablet:min-h-[854px] tablet:flex-col tablet:gap-[80px]",
            "mobile:w-full mobile:min-h-[571px] mobile:flex-col mobile:gap-10"
          )}
        >
          <div
            className={cn(
              "relative w-[464.42px] h-[480px] flex items-center justify-center",
              "mobile:w-[296px] h-[305px]"
            )}
          >
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

          <div
            className={cn(
              "w-[560px] min-h-[294px] flex gap-6 flex-col",
              "tablet:w-full",
              "mobile:w-full mobile:min-h-[166px] mobile:h-auto mobile:gap-2"
            )}
          >
            <div
              className={cn(
                "w-full h-[158px] flex gap-1 flex-col",
                "mobile:h-0 mobile:min-h-[70px]"
              )}
            >
              <p
                className={cn(
                  "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-gra",
                  "mobile:text-[12px] mobile:leading-[18px]"
                )}
              >
                benefits 2
              </p>
              <p
                className={cn(
                  "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
                  "tablet:hidden",
                  "mobile:hidden"
                )}
              >
                좋아하는 스포츠 선수를 함께 응원한다면 더 즐거워요!
              </p>
              <p
                className={cn(
                  "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
                  "mobile:text-[16px] mobile:leading-6",
                  "pc:hidden"
                )}
              >
                좋아하는 스포츠 선수를 함께 <br /> 응원한다면 더 즐거워요!
              </p>
            </div>
            <p
              className={cn(
                "font-medium text-[18px] leading-7 tracking-[-0.04em] text-gray7",
                "mobile:text-[12px] mobile:leading-[18px]"
              )}
            >
              페이커, 손흥민, 오타니, T1, 젠지, 토트넘 등.. 좋아하는 팀이나
              선수가 있으신가요?
              <br /> 추천시스템을 통해서 서로를 존중해주는 응원 문화를
              지향합니다. 따라서 팬인 선수나 팀에 대한 정보 공유, 응원 게시글
              등을 통하여 다양한 지식을 넓히고 쌓아갈 수 있습니다. 이른 바
              덕업일치 실현을 해볼 때 입니다.
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full h-[360px] flex items-center justify-center bg-[url('/Service_footer.png')] bg-center bg-cover relative",
          "mobile:h-[200px]"
        )}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div
          className={cn(
            "min-w-[558px] min-h-[232px] flex gap-6 flex-col items-center justify-center relative z-10",
            "tablet:min-w-[561px]",
            "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-4"
          )}
        >
          <div
            className={cn(
              "min-w-[558px] min-h-[156px] flex flex-col items-center justify-center gap-6",
              "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-2"
            )}
          >
            <div
              className={cn(
                "min-h-[80px] flex items-center gap-[10px]",
                "mobile:hidden"
              )}
            >
              <DoubleLogo strokeWidth={0.1} />
              <Service_PlayHive />
            </div>
            <div
              className={cn(
                "min-h-[32px] flex items-center gap-1",
                "pc:hidden",
                "tablet:hidden"
              )}
            >
              <DoubleLogo width={20} height={27} strokeWidth={0.1} />
              <Service_PlayHive width={93} height={32} />
            </div>
            <p
              className={cn(
                "font-bold text-[36px] leading-[52px] tracking-[-0.02em] text-white",
                "mobile:text-[16px] mobile:leading-6"
              )}
            >
              &quot;여러분의 스포츠 이야기를 들려주세요!”
            </p>
          </div>
          <Link href={"/sign"}>
            <button
              className={cn(
                "w-[160px] h-[52px] rounded-[5px] px-[22px] py-[18px] flex gap-[10px] bg-gra text-white items-center justify-center",
                "mobile:w-[120px] mobile:h-[40px] mobile:text-[14px] mobile:whitespace-nowrap"
              )}
            >
              로그인/회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
