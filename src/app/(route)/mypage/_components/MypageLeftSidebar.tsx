"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmModal from "@/app/_components/ConfirmModal";
import useLogout from "@/_hooks/fetcher/mypage/useLogout";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { cn } from "@/utils";

const MypageLeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];
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

  const boardList = [
    { name: "마이페이지", id: 0, path: `/${basePath}` },
    { name: "내가 쓴 게시물", id: 1, path: `/${basePath}/posts` },
    { name: "내가 쓴 댓글", id: 2, path: `/${basePath}/comments` },
    { name: "내 정보 수정", id: 4, path: `/${basePath}/edit-profile` },
    {
      name: userRole === "USER" ? "나의 문의내역" : "문의내역",
      id: 3,
      path: `/${basePath}/inquiries`,
    },
    { name: "개선요청", id: 5, path: `/customer/feedback` },
    { name: "로그아웃", id: 6, path: `/${basePath}/logout` },
  ];

  const isCurrentPath = (boardPath: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts.includes("ALL") ? "" : pathParts[2] || "";
    const boardCategory = boardPath.split("/")[2] || "";

    return currentCategory === boardCategory;
  };

  const handleRoute = (path: string) => {
    if (path === `/${basePath}/logout`) {
      setShow(true);
      return;
    }
    router.push(path);
  };

  const onClose = () => setShow(false);

  const onConfirm = () => {
    setShow(false);
    logout();
  };

  return (
    <div
      className={cn(
        "w-[160px] h-[364px]",
        "tablet:w-[688px] tablet:h-[52px]",
        "mobile:w-full mobile:h-[48px]"
      )}
    >
      <div
        className={cn(
          "w-full bg-[#FFFFFF] rounded-[5px]",
          "tablet:flex tablet:rounded-b-none",
          "mobile:flex mobile:h-[48px] mobile:border-b-2 mobile:border-gray3 mobile:w-[768px]"
        )}
      >
        {boardList.map((board) => (
          <div
            onClick={() => board.path && handleRoute(board.path)}
            key={board.id}
            className={cn(
              `flex items-center w-full h-[52px] px-[16px] py-[12px] cursor-pointer ${
                isCurrentPath(board.path)
                  ? "font-[700] text-[#00ADEE] bg-bg0"
                  : "font-[400] text-[#424242]"
              }`,
              "tablet:justify-center tablet:p-0",
              `mobile:justify-center mobile:h-[48px] mobile:py-[13px] mobile:text-[14px] mobile:leading-[28px] mobile:max-w-[112px] mobile:${
                isCurrentPath(board.path) ? "text-gray7" : "text-gray5"
              } mobile:${isCurrentPath(board.path) && "border-b-2"} mobile:${
                isCurrentPath(board.path) && "border-gray7"
              } mobile:${board.name === "로그아웃" && "hidden"}`
            )}
          >
            <p className="text-nowrap">{board.name}</p>
          </div>
        ))}
      </div>
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

export default MypageLeftSidebar;
