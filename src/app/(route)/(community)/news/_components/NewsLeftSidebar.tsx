"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  const boardList = [
    { name: "전체", id: 0, path: `/${basePath}` },
    { name: "E스포츠", id: 1, path: `/${basePath}/esports-news` },
    { name: "축구", id: 2, path: `/${basePath}/football-news` },
    { name: "야구", id: 3, path: `/${basePath}/baseball-news` },
    { name: "개선요청", id: 6, path: `/customer/feedback` },
  ];

  const isCurrentPath = (boardPath: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts.includes("ALL") ? "" : pathParts[2] || "";
    const boardCategory = boardPath.split("/")[2] || "";

    return currentCategory === boardCategory;
  };

  return (
    <div className="w-full bg-[#FFFFFF]">
      {boardList.map((board) => (
        <Link href={board.path} key={board.id}>
          <div
            className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
              isCurrentPath(board.path)
                ? "font-[700] text-[#00ADEE] bg-[#F8FDFF]"
                : "font-[400] text-[#424242] bg-[#FFFFFF]"
            }`}
          >
            <p>{board.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeftSidebar;
