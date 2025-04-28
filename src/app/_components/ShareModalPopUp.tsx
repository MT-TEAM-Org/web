import React, { useEffect } from "react";
import { useToast } from "@/_hooks/useToast";
import CustomIcon from "./IconComponents/Icon";
import { cn } from "@/utils";
import { createPortal } from "react-dom";

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
    "w-[160px] min-h-[48px] rounded-[5px] py-4 px-5 flex gap-[10px] font-bold text-[16px] items-center justify-center mobile:text-[14px] mobile:leading-5 mobile:min-h-[40px]";

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

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className={cn(
          "w-[408px] min-h-[274px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-soft-md relative",
          "mobile:w-[328px] mobile:min-h-[204px] mobile:h-[204px] mobile:p-6"
        )}
      >
        <p
          className={cn(
            "font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-center text-black",
            "mobile:text-[18px] mobile:leading-7"
          )}
        >
          공유하기
        </p>
        <div
          className={cn(
            "w-full h-auto flex gap-6 items-center justify-center",
            "mobile:h-[40px]"
          )}
        >
          {shareOptions.map(
            ({ platform, url, icon, popupWidth, popupHeight }) => (
              <div
                key={platform}
                className={cn(
                  "cursor-pointer w-[60px] h-[60px]",
                  "mobile:w-[40px] mobile:h-[40px]"
                )}
                onClick={() => openPopup(url, popupWidth, popupHeight)}
              >
                <CustomIcon icon={icon} />
              </div>
            )
          )}
        </div>

        <div className={cn("w-full h-[40px] flex gap-2", "mobile:h-[40px]")}>
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
    </div>,
    document.body
  );
};

export default ShareModalPopUp;
