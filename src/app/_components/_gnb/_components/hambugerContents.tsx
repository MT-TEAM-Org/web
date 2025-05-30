"use client";

import { HAMBURGER_MENU } from "@/app/_constants/navigation";
import { useAuthStore } from "@/utils/Store";
import { useEffect, useState } from "react";
import CustomIcon from "../../IconComponents/Icon";
import { usePathname, useRouter } from "next/navigation";
import useAuthCheck from "@/_hooks/useAuthCheck";
import Image from "next/image";

interface HamburgerContentsProps {
  onClose: () => void;
}

const HamburgerContents = ({ onClose }: HamburgerContentsProps) => {
  const [isDropDown, setIsDropDown] = useState<{ [key: string]: boolean }>({});

  const { data: userData } = useAuthCheck();
  const { logout } = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleDropDownClick = (id: string) => {
    setIsDropDown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleLoginClick = () => {
    router.push("/sign");
    onClose();
  };

  const handleRoute = (link: string) => {
    if (!link) return;
    router.push(link);
    onClose();
  };

  const isActiveMenu = (link: string) => {
    if (!link) return false;
    return pathname.includes(link);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-[60px] overflow-y-auto w-full h-full flex flex-col justify-center items-center bg-white z-50">
      {isLoggedIn ? (
        <div className="flex flex-col justify-center items-center w-full h-[102px]">
          <div className="flex items-center w-full max-w-[192px] h-[42px] bg-[#F8FDFF] rounded-full">
            <div className="flex items-center justify-center mx-auto w-full gap-x-[16px]">
              <div className="w-[24px] h-[24px] rounded-full items-center justify-center shadow-soft-md overflow-hidden">
                {userData?.data?.data?.imgUrl ? (
                  <Image
                    src={userData.data.data.imgUrl}
                    alt="사용자 프로필"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                ) : (
                  <CustomIcon
                    icon="MOBILE_HAMBURGER_DEFAULT_PROFILE"
                    className="text-white object-cover p-1 mb-[1px] ml-[1px]"
                  />
                )}
              </div>

              <p className="text-[16px] leading-[26px] text-gray7 tracking-[-0.02em]">
                {userData?.data?.data?.nickname}님
              </p>
            </div>
          </div>
          <p className="w-full h-[24px] mt-[4px] flex items-center mx-auto justify-center font-bold text-[16px] leading-[24px] tracking-[-0.02em]">
            플레이하이브에 오신것을 환영합니다.
          </p>
        </div>
      ) : (
        <div className="flex w-full h-[72px] justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-[40px] h-[40px] bg-gray1 rounded-full">
              <CustomIcon
                icon="MOBILE_USER_LOGO"
                className="w-[20px] h-[20px] text-white"
              />
            </div>
            <p className="h-[20px] text-[14px] font-bold leading-[20px] text-gray8">
              로그인이 필요합니다.
            </p>
          </div>

          <button
            onClick={handleLoginClick}
            className="flex items-center justify-center w-full max-w-[120px] h-[40px] bg-[#00ADEE] rounded-[5px] py-[13px] px-[16px] whitespace-nowrap"
          >
            <span className="font-bold text-[14px] leading-[14px] text-white">
              로그인/회원가입
            </span>
          </button>
        </div>
      )}
      <div className="w-full h-full flex flex-col items-center gap-y-[16px] overflow-y-auto pb-[100px]">
        {HAMBURGER_MENU.filter(
          (item) => !(item.authRequired && !isLoggedIn)
        ).map((item) => (
          <div key={item.title} className="w-full">
            <div
              onClick={() => {
                if (item.dropDown) {
                  handleDropDownClick(item.id);
                } else if (item.link) {
                  handleRoute(item.link);
                }
              }}
              className="flex justify-between w-full py-[12px] px-[16px] cursor-pointer"
            >
              <div
                className={`font-bold text-[14px] leading-[20px] ${
                  isActiveMenu(item.link) ? "text-[#00ADEE]" : "text-black"
                }`}
              >
                {item.title}
              </div>
              {item.dropDown && (
                <div>
                  {isDropDown[item.id] ? (
                    <CustomIcon
                      icon="MOBILE_MENU_ARROW_UP"
                      className="w-[16px] h-[16px] text-white"
                    />
                  ) : (
                    <CustomIcon
                      icon="MOBILE_MENU_ARROW_DOWN"
                      className="w-[16px] h-[16px] text-white"
                    />
                  )}
                </div>
              )}
            </div>
            {item.dropDown && (
              <div
                className={`transform origin-top bg-gray1 pl-[32px] overflow-hidden transition-transform duration-300 ${
                  isDropDown[item.id]
                    ? "scale-y-100 opacity-100 h-auto"
                    : "scale-y-0 opacity-0 h-0"
                }`}
              >
                {item.dropDown.map((subItem) => (
                  <p
                    key={subItem.title}
                    onClick={() => {
                      if (subItem.title === "로그아웃") {
                        logout();
                        onClose();
                        router.replace("/");
                      } else if (subItem.link) {
                        handleRoute(subItem.link);
                      }
                    }}
                    className="py-[16px] pr-[16px] text-[14px] leading-[20px] text-[#303030] cursor-pointer"
                  >
                    {subItem.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HamburgerContents;
