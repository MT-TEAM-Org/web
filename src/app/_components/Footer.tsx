"use client";

import { useState } from "react";
import { LogoWhite } from "./icon/LogoWhite";
import ModalPopup from "./ModalPopup";
import GuestModalPopup from "./GuestModalPopup";
import { useAdminRole } from "../(route)/customer/_utils/adminChecker";
import { cn } from "@/utils";
import Link from "next/link";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const userRole = useAdminRole();

  const footerObject = [
    { name: "서비스 소개", link: "/service-introduction" },
    { name: "개선요청", link: "/customer/feedback" },
    { name: "공지사항", link: "/customer" },
    { name: "이용약관", link: "/customer/terms" },
    { name: "개인정보처리방침", link: "/customer/privacy-policy" },
  ];

  const footerGrayText =
    "font font-medium text-[16px] leading-[24px] text-gray5";

  return (
    <div
      className={cn(
        "w-full min-h-[356px] bg-black flex flex-col justify-center text-white pt-[40px]",
        "tablet:text-center tablet:pt-[24px]",
        "mobile:text-center mobile:pt-[24px]"
      )}
    >
      <div
        className={cn(
          "w-full max-w-[1200px] min-h-[212px] gap-[24px] flex flex-col mx-auto",
          "tablet:gap-[16px]",
          "mobile:gap-[16px]"
        )}
      >
        <div
          className={cn(
            "tablet:flex tablet:justify-center tablet:items-center tablet:mx-auto tablet:w-[89.5px] tablet:h-[24px]",
            "mobile:flex mobile:justify-center mobile:items-center mobile:mx-auto mobile:w-[89.5px] mobile:h-[24px]"
          )}
        >
          <LogoWhite />
        </div>
        <div className="flex justify-between">
          <div className="w-full flex flex-col">
            <div
              className={cn(
                "w-full max-w-[1200px] flex justify-between",
                "tablet:flex-col tablet:items-center tablet:justify-center",
                "mobile:flex-col mobile:gap-3"
              )}
            >
              <p
                className={cn(
                  "font-[700] text-[24px] tablet:text-[18px] leading-[38px] tablet:leading-[28px]",
                  "mobile:text-[18px] mobile:leading-[28px] mobile:tracking-[0.04em] text-white"
                )}
              >
                열정적으로 응원하고 서로를 존중하며
                <br />
                <span
                  className={cn(
                    "font-[700] text-[24px] leading-[38px] text-white",
                    "tablet:leading-[28px] tablet:text-[18px]",
                    "mobile:text-[18px] mobile:leading-[28px] mobile:tracking-[0.04em]"
                  )}
                >
                  <span className={cn("hidden", "pc:block")}>모두</span> 함께
                  즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
                </span>
              </p>
              <div
                className={cn(
                  "flex justify-center items-center",
                  "tablet:flex-col tablet:items-center tablet:mt-[12px]",
                  "mobile:flex-col mobile:items-center"
                )}
              >
                <div className="flex flex-col">
                  <p
                    className={`${footerGrayText} font-[700] text-[24px] tablet:text-[16px] leading-[44px] tablet:leading-[24px] text-white tablet:text-gray5 mobile:text-[16px] mobile:leading-6 mobile:tracking-[-0.02em] mobile:text-gray5`}
                  >
                    TeamPlayHive@gmail.com
                  </p>
                  <p
                    className={cn(
                      "tablet:text-[12px] tablet:leading-[18px] tablet:text-gray5",
                      "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] mobile:text-gray5"
                    )}
                  >
                    AM 10:00 - PM 7:00
                    <span className="hidden tablet:inline">
                      (주말, 공휴일 휴무)
                    </span>
                    <span className="tablet:hidden">(주말 및 공휴일 휴무)</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className={cn(
                    "w-[120px] h-[40px] rounded-[5px] py-[13px] px-[16px] text-gray7 bg-white border-gray3 font-bold text-[14px] leading-[14px] ml-[40px]",
                    "tablet:ml-0 tablet:mt-[12px] tablet:mb-[16px]",
                    "mobile:ml-0 mobile:mt-3 mobile:mb-4"
                  )}
                >
                  문의하기
                </button>
              </div>
            </div>
            <div
              className={cn(
                "pc:flex pc:my-[24px]",
                "tablet:text-center tablet:justify-center tablet:items-center tablet:border-t-[1px] tablet:border-gray7 tablet:py-[16px]",
                "mobile:text-center mobile:justify-center mobile:items-center mobile:border-t-[1px] mobile:border-gray7 mobile:py-[16px] mobile:mx-4"
              )}
            >
              <p
                className={`${footerGrayText} tablet:font-[500] tablet:text-[12px] tablet:leading-[18px] tablet:text-gray6, mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]`}
              >
                서비스명 : PlayHive · 대표 : 홍길표 · 개인정보 보호책임자 :
                홍길표
                <br />
                컨텐츠 내용에 대한 저작권 및 법적 책임은 자료제공사 또는
                글쓴이에 있으며 <br className="hidden mobile:block" />
                PlayHive의 입장과 다를 수 있습니다.
              </p>
            </div>
            <div className={cn("hidden", "tablet:block", "mobile:block")}>
              <div
                className={cn(
                  "flex flex-wrap justify-center",
                  "tablet:mb-[16px]",
                  "mobile:flex mobile:gap-6"
                )}
              >
                {footerObject.map((item, index) => (
                  <span
                    key={index}
                    className={cn(
                      "font-medium text-[16px] leading-[26px] text-gray5 tablet:underline",
                      "tablet:text-[14px] tablet:font-[700]",
                      item.name === "개선요청" && "hidden",
                      "mobile:text-[14px] mobile:underline mobile:mb-4 mobile:underline-offset-[2px]"
                    )}
                  >
                    <Link
                      className={cn(
                        "tablet:mr-[24px]",
                        item.name === "개인정보처리방침" && "tablet:mr-0"
                      )}
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                    {index < footerObject.length - 1 && index !== 1 && (
                      <span className="mx-2 tablet:hidden mobile:hidden">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-full max-w-[1200px] h-[80px] flex justify-between items-center mx-auto border-gray7 border-t-[1px]",
            "tablet:justify-center tablet:items-center tablet:h-[43px]",
            "mobile:justify-center mobile:items-center mobile:max-w-[calc(100%-32px)] mobile:mx-auto"
          )}
        >
          <p
            className={cn(
              `${footerGrayText} tablet:text-[12px] tablet:leading-[18px] text-gray6`,
              "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] text-gray6"
            )}
          >
            Copyright ⓒPlayhive Co., Ltd All rights reserved.
          </p>
          <div className={cn("tablet:hidden", "mobile:hidden")}>
            {footerObject.map((item, index) => (
              <span
                key={index}
                className={cn(
                  "font-medium text-[16px] leading-[26px] text-gray5",
                  item.name === "개선요청" && "tablet:hidden"
                )}
              >
                <a href={item.link}>{item.name}</a>
                {index < footerObject.length - 1 && (
                  <span className="mx-2">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {userRole ? (
        <ModalPopup show={showModal} setShow={setShowModal} />
      ) : (
        <GuestModalPopup show={showModal} setShow={setShowModal} />
      )}
    </div>
  );
}
