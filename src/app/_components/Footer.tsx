"use client";

import { useState } from "react";
import { LogoWhite } from "./icon/LogoWhite";
import ModalPopup from "./ModalPopup";
import GuestModalPopup from "./GuestModalPopup";
import { useAdminRole } from "../(route)/customer/_utils/adminChecker";

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
    <div className="w-full h-[356px] bg-black flex flex-col justify-center text-white pt-[40px]">
      <div className="w-[1200px] min-h-[212px] gap-[24px] flex flex-col mx-auto">
        <div>
          <LogoWhite />
        </div>
        <div className="flex justify-between gap-[24px]">
          <div className="flex flex-col justify-around">
            <div className="w-[1200px] flex justify-between">
              <p className="font-medium text-[24px] leading-[38px]">
                열정적으로 응원하고 서로를 존중하며
                <br />
                <span className="font-bold text-[24px] leading-[38px]">
                  <span className="tablet:hidden">모두</span> 함께 즐기는 클린
                  스포츠 커뮤니티, 플레이 하이브!
                </span>
              </p>
              <div className="flex flex-col">
                <p
                  className={`${footerGrayText} font-bold text-[24px] leading-[44px] text-white`}
                >
                  TeamPlayHive@gmail.com
                </p>
                <p>AM 10:00 - PM 7:00 (주말 및 공휴일 휴무)</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-[120px] min-h-[40px] mt-2.5 rounded-[5px] py-[13px] px-[16px] text-gray7 bg-gray3 font-bold text-[14px] leading-[14px]"
                >
                  문의하기
                </button>
              </div>
            </div>
            <div className="flex mb-[24px]">
              <p className={footerGrayText}>
                서비스명 : PlayHive · 대표 : 홍길표 · 개인정보 보호책임자 :
                홍길표
                <br />
                컨텐츠 내용에 대한 저작권 및 법적 책임은 자료제공사 또는
                글쓴이에 있으며 PlayHive의 입장과 다를 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[1200px] min-h-[80px] flex justify-between items-center mx-auto border-gray7 border-t-[2px]">
          <p className={footerGrayText}>
            Copyright ⓒPlayhive Co., Ltd All rights reserved.
          </p>
          <div>
            {footerObject.map((item, index) => (
              <span
                key={index}
                className="font-medium text-[16px] leading-[26px] text-gray5"
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
