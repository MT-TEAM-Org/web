"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = pathname.split("/");

  const rootPath = pathParts[1];
  const boardType = pathname.split("/")[2];

  const boardList = [
    { name: "전체", id: 0, path: `/${rootPath}/${boardType}/ALL` },
    { name: "자유", id: 1, path: `/${rootPath}/${boardType}/FREE` },
    { name: "질문", id: 2, path: `/${rootPath}/${boardType}/QUESTION` },
    { name: "이슈", id: 3, path: `/${rootPath}/${boardType}/ISSUE` },
    ...(boardType === "esports"
      ? [
          {
            name: "전적 인증",
            id: 4,
            path: `/${rootPath}/${boardType}/VERIFICATION`,
          },
          { name: "플레이 팁", id: 5, path: `/${rootPath}/${boardType}/TIP` },
        ]
      : []),
    { name: "개선요청", id: 6, path: `/customer/feedback` },
  ];

  const isCurrentPath = (boardPath: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[3];
    const boardCategory = boardPath.split("/")[3] || "";

    return currentCategory === boardCategory;
  };

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-[160px] h-[364px]">
      <div className="w-full bg-[#FFFFFF] rounded-[5px]">
        {boardList.map((board) => (
          <div
            onClick={() => board.path && handleRoute(board.path)}
            key={board.id}
            className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
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

export default LeftSidebar;
