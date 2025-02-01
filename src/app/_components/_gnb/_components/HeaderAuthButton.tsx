"use client";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { ProfileLogo } from "../../icon/ProfileLogo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/_hooks/api";

export const LoginButton = () => {
  const router = useRouter();
  const { data: userData, isLoading } = useAuthCheck();

  return (
    <>
      {isLoading ? (
        //TODO: 로딩 스피터 추가
        <div>로딩중</div>
      ) : (
        <button
          onClick={() => router.push("/sign")}
          className="w-[124px] min-h-[40px] py-[13px] px-[16px] rounded-[5px] defaultButtonColor defaultButtonColor:hover text-white font-bold text-[14px] leading-[14px] whitespace-nowrap"
        >
          로그인/회원가입
        </button>
      )}
    </>
  );
};

export const MypageButton = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const { data: userData, isLoading } = useAuthCheck();
  const nickname = userData?.data?.data?.nickname;

  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchLogout = async () => {
    const response = await api.post(
      "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  };

  const useLogoutMutation = useMutation({
    mutationFn: fetchLogout,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.resetQueries({ queryKey: ["authCheck"] });
      router.push("/");
    },
  });

  const dropDownMenu = [
    {
      name: "마이페이지",
      link: "/mypage",
    },
    {
      name: "내가 쓴 게시물",
      link: "",
    },
    {
      name: "내가 쓴 댓글",
      link: "",
    },
    {
      name: "내 정보 수정",
      link: "",
    },
    {
      name: "나의 문의내역",
      link: "",
    },
    {
      name: "로그아웃",
    },
  ];
  return (
    <div
      className="relative flex items-center gap-[16px] max-w-[165px] min-h-[42px] rounded-full py-[8px] px-[16px] cursor-pointer"
      onMouseEnter={() => setIsDropDown(true)}
    >
      <ProfileLogo />
      <p className="max-w-[83px] min-h-[26px] font-medium text-[16px] leading-[26px] text-[#424242]">
        {nickname}님
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
              onClick={(e) => {
                if (item.name === "로그아웃") {
                  useLogoutMutation.mutate();
                } else {
                  if (item.link) {
                    router.push(item.link);
                  }
                }
              }}
              className="w-[252px] min-h-[48px] border-b border-[#EEEEEE] py-[4px] px-[16px] last:py-[16px] last:border-b-0"
            >
              <button className="text-[#424242] text-[16px] leading-[16px] font-medium w-full text-left">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
