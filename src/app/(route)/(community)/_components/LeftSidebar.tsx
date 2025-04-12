"use client";

import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split("/");
  const rootPath = pathParts[1];
  const boardType = pathParts[2];
  const activeTab = pathParts[3]?.toUpperCase();

  const boardList = [
    { name: "전체", id: "ALL", path: `/${rootPath}/${boardType}/ALL` },
    { name: "자유", id: "FREE", path: `/${rootPath}/${boardType}/FREE` },
    {
      name: "질문",
      id: "QUESTION",
      path: `/${rootPath}/${boardType}/QUESTION`,
    },
    { name: "이슈", id: "ISSUE", path: `/${rootPath}/${boardType}/ISSUE` },
    ...(boardType === "esports"
      ? [
          {
            name: "전적 인증",
            id: "VERIFICATION",
            path: `/${rootPath}/${boardType}/VERIFICATION`,
          },
          {
            name: "플레이 팁",
            id: "TIP",
            path: `/${rootPath}/${boardType}/TIP`,
          },
        ]
      : []),
    { name: "개선요청", id: "feedBack", path: `/customer/feedback` },
  ];

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-[160px] h-[364px]">
      <div className="w-full bg-white rounded-[5px]">
        {boardList.map((board) => {
          const isActive = board.id === activeTab;

          return (
            <div
              key={board.id}
              onClick={() => handleRoute(board.path)}
              className={`w-full h-[52px] px-[16px] py-[12px] flex justify-start items-center cursor-pointer hover:text-gra ${
                isActive ? "font-[700] text-gra" : "font-[400] text-gray7"
              }`}
            >
              <p>{board.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
