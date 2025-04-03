"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileLogo } from "../../icon/ProfileLogo";
import ConfirmModal from "../../ConfirmModal";
import useLogout from "@/_hooks/fetcher/mypage/useLogout";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useAuthStore } from "@/utils/Store";

interface DropDownMenuItem {
  name: string;
  link?: string;
}

export const MypageButton = ({ userNickname }: { userNickname: string }) => {
  const router = useRouter();
  const [isDropDown, setIsDropDown] = useState(false);
  const { data: authCheckData } = useAuthCheck();
  const userRole = authCheckData?.data?.data?.role;
  const [show, setShow] = useState(false);
  const { mutate: logout, isPending: logoutIsPending } = useLogout();
  const { logout: changeLogout } = useAuthStore();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [show]);

  const dropDownMenu = [
    {
      name: "마이페이지",
      link: "/mypage",
    },
    {
      name: "내가 쓴 게시물",
      link: "/mypage/posts",
    },
    {
      name: "내가 쓴 댓글",
      link: "/mypage/comments",
    },
    {
      name: "내 정보 수정",
      link: "/mypage/edit-profile",
    },
    {
      name: userRole === "USER" ? "나의 문의내역" : "문의내역",
      link: "/mypage/inquiries",
    },
    {
      name: "로그아웃",
    },
  ];

  const handleClickMenu = (item: DropDownMenuItem) => {
    const { name, link } = item;
    if (name === "로그아웃") {
      setShow(true);
    } else {
      if (link) {
        router.push(link);
      }
    }
  };

  const onClose = () => setShow(false);

  const onConfirm = () => {
    setShow(false);
    changeLogout();
    logout();
  };

  return (
    <div
      className={`relative flex items-center gap-[16px] max-w-[165px] min-h-[42px] rounded-full py-[8px] px-[16px] ${
        !show && "cursor-pointer"
      }`}
      onMouseEnter={() => setIsDropDown(true)}
    >
      <ProfileLogo />
      <p className="max-w-[83px] min-h-[26px] leading-[26px] text-gray7">
        {userNickname || ""}님
      </p>

      {isDropDown && (
        <ul
          onMouseLeave={() => setIsDropDown(false)}
          onMouseEnter={() => setIsDropDown(true)}
          className="flex flex-col items-center  max-w-[252px] min-h-[298px] absolute top-12 right-0 z-10 py-[16px] border rounded-[10px] border-gray3 bg-white shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.1)]"
        >
          {dropDownMenu.map((item, index) => (
            <li
              key={index}
              className="w-[252px] h-[48px] border-b border-gray2 py-[4px] px-[16px]  flex items-center"
            >
              <button
                onClick={() => handleClickMenu(item)}
                disabled={logoutIsPending}
                className="text-gray7 text-[16px] font-medium w-full text-left leading-[26px] tracking-[-0.02em]"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <ConfirmModal
        show={show}
        onClose={onClose}
        title="로그아웃 하시겠습니까?"
        message="다시 로그인 하셔야합니다."
        onConfirm={onConfirm}
        closeText="취소"
        confirmText="로그아웃"
        isPending={logoutIsPending}
      />
    </div>
  );
};
