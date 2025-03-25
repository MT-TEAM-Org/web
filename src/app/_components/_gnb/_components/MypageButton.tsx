"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileLogo } from "../../icon/ProfileLogo";
import ConfirmModal from "../../ConfirmModal";
import useLogout from "@/_hooks/fetcher/mypage/useLogout";
import useAuthCheck from "@/_hooks/useAuthCheck";

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
      <p className="max-w-[83px] min-h-[26px] leading-[26px] text-[#424242]">
        {userNickname || ""}님
      </p>

      {isDropDown && (
        <ul
          onMouseLeave={() => setIsDropDown(false)}
          onMouseEnter={() => setIsDropDown(true)}
          className="flex flex-col items-center gap-y-[16px] max-w-[252px] min-h-[336px] rounded-[10px] absolute top-12 right-0 z-10 bg-white shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.1)] py-[16px] border-[#dbdbdb]"
        >
          {dropDownMenu.map((item, index) => (
            <li
              key={index}
              className="w-[252px] min-h-[48px] border-b border-[#EEEEEE] py-[4px] px-[16px] last:py-[16px] last:border-b-0"
            >
              <button
                onClick={() => handleClickMenu(item)}
                disabled={logoutIsPending}
                className="text-[#424242] text-[16px] leading-[16px] font-medium w-full text-left"
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
