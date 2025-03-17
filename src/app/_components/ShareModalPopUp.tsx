import React, { useEffect } from "react";
import Image from "next/image";
import { LinkIcon } from "./icon/LinkIcon";

const ShareModalPopUp = ({ setActiveModal, url }) => {
  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const copyBtn = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!"); // 임시
    } catch (err) {
      alert("복사에 실패했습니다.");
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent("PlayHive");

  const socialMedia = [
    {
      name: "x",
      src: "/Share_x.png",
      alt: "Share to X",
      onClick: () => {
        const popupWidth = 600;
        const popupHeight = 700;
        const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
        const top =
          (window.innerHeight - popupHeight) / 2 + window.screenY + 50;

        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${message}`,
          "x",
          `width=${popupWidth},height=${popupHeight},resizable=no,left=${left},top=${top}`
        );
      },
    },
    {
      name: "facebook",
      src: "/Share_facebook.png",
      alt: "Share to Facebook",
      onClick: () => {
        const popupWidth = 1000;
        const popupHeight = 520;
        const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
        const top =
          (window.innerHeight - popupHeight) / 2 + window.screenY + 50;

        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "facebook",
          `toolbar=0,status=0,width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
        );
      },
    },
    {
      name: "nblog",
      src: "/Share_Nblog.png",
      alt: "Share to Naver Blog",
      onClick: () => {
        const popupWidth = 500;
        const popupHeight = 700;
        const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
        const top =
          (window.innerHeight - popupHeight) / 2 + window.screenY + 50;

        window.open(
          `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${message}`,
          "naver",
          `width=${popupWidth},height=${popupHeight},resizable=no,left=${left},top=${top}`
        );
      },
    },
  ];

  const buttonBaseStyle =
    "w-[160px] min-h-[40px] rounded-[5px] py-4 px-5 flex gap-[10px] font-bold text-[16px] items-center justify-center";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[408px] min-h-[274px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-md relative">
        <p className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-center">
          공유하기
        </p>
        <div className="w-full h-auto flex gap-6 items-center justify-center">
          {socialMedia.map((media) => (
            <Image
              key={media.name}
              src={media.src}
              alt={media.alt}
              width={60}
              height={60}
              onClick={media.onClick}
              className="cursor-pointer"
            />
          ))}
        </div>
        <div className="w-full h-[40px] flex gap-2">
          <button
            onClick={closeModal}
            className={`${buttonBaseStyle} bg-white border border-gray3`}
          >
            취소
          </button>
          <button
            onClick={copyBtn}
            className={`${buttonBaseStyle} bg-[#00ADEE] text-white`}
          >
            링크복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModalPopUp;
