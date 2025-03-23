"use client";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/_hooks/api";

const MypageLeftSidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

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

  const { mutate: logout, isPending: logoutIsPending } = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.resetQueries({ queryKey: ["authCheck"] });
      router.push("/");
    },
  });

  const boardList = [
    { name: "마이페이지", id: 0, path: `/${basePath}` },
    { name: "내가 쓴 게시물", id: 1, path: `/${basePath}/posts` },
    { name: "내가 쓴 댓글", id: 2, path: `/${basePath}/comments` },
    { name: "내 정보 수정", id: 4, path: `/${basePath}/edit-profile` },
    { name: "나의 문의내역", id: 3, path: `/${basePath}/inquiries` },
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
      logout();
      router.replace("/");
      return;
    }
    router.push(path);
  };

  return (
    <div className="w-[160px] h-[364px]">
      <div className="w-full bg-[#FFFFFF] rounded-[5px]">
        {boardList.map((board) => (
          <div
            onClick={() => board.path && handleRoute(board.path)}
            key={board.id}
            className={`flex items-center w-full h-[52px] px-[16px] py-[12px] cursor-pointer ${
              isCurrentPath(board.path)
                ? "font-[700] text-[#00ADEE]"
                : "font-[400] text-[#424242]"
            }`}
          >
            <p>{board.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MypageLeftSidebar;
