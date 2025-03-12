import React, { useEffect } from "react";
import Image from "next/image";

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
      name: "facebook",
      src: "/Share_facebook.png",
      alt: "Share to Facebook",
      onClick: () => {
        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "facebook",
          "toolbar=0,status=0,width=655,height=520"
        );
      },
    },
    {
      name: "x",
      src: "/Share_x.png",
      alt: "Share to X",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${message}`,
          "x",
          "width=600, height=700, resizable=no"
        );
      },
    },
    {
      name: "nblog",
      src: "/Share_Nblog.png",
      alt: "Share to Naver Blog",
      onClick: () => {
        window.open(
          `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${message}`,
          "naver",
          "width=600, height=700, resizable=no"
        );
      },
    },
  ];

  const buttonBaseStyle =
    "w-[160px] h-[36px] rounded-[5px] py-4 px-5 flex gap-[10px] font-bold text-[14px] leading-5 items-center justify-center";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[408px] min-h-[230px] rounded-[10px] p-6 flex flex-col gap-6 bg-white shadow-md relative">
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
        <div className="w-full min-h-[48px] flex gap-2 justify-center items-center">
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
