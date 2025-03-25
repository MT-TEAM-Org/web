import React, { useEffect } from "react";
import { useToast } from "@/_hooks/useToast";
import CustomIcon from "./IconComponents/Icon";

const ShareModalPopUp = ({ setActiveModal, url }) => {
  const toast = useToast();

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
    setActiveModal(false);
    try {
      await navigator.clipboard.writeText(url);
      toast.success(
        "주소가 복사되었습니다.",
        "원하는 곳에 붙여넣기를 해주세요."
      );
    } catch (err) {
      toast.error("주소가 복사되지 않았습니다.", "다시 시도 해주세요.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveModal(false);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent("PlayHive");

  const buttonBaseStyle =
    "w-[160px] min-h-[40px] rounded-[5px] py-4 px-5 flex gap-[10px] font-bold text-[16px] items-center justify-center";

  const shareOptions = [
    {
      platform: "twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${message}`,
      icon: "SHARE_X_ICON",
      popupWidth: 600,
      popupHeight: 700,
    },
    {
      platform: "facebook",
      url: `http://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "SHARE_FACEBOOK_ICON",
      popupWidth: 1000,
      popupHeight: 520,
    },
    {
      platform: "naver",
      url: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${message}`,
      icon: "SHARE_BLOG_ICON",
      popupWidth: 500,
      popupHeight: 700,
    },
  ] as const;

  const openPopup = (shareUrl, popupWidth, popupHeight) => {
    const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
    const top = (window.innerHeight - popupHeight) / 2 + window.screenY + 50;

    window.open(
      shareUrl,
      "shareWindow",
      `width=${popupWidth},height=${popupHeight},resizable=no,left=${left},top=${top}`
    );
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-[408px] min-h-[274px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-md relative">
        <p className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-center">
          공유하기
        </p>
        <div className="w-full h-auto flex gap-6 items-center justify-center">
          {shareOptions.map(
            ({ platform, url, icon, popupWidth, popupHeight }) => (
              <div
                key={platform}
                className="cursor-pointer w-[60px] h-[60px]"
                onClick={() => openPopup(url, popupWidth, popupHeight)}
              >
                <CustomIcon icon={icon} />
              </div>
            )
          )}
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
            className={`${buttonBaseStyle} bg-gra text-white`}
          >
            링크복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModalPopUp;
