"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  const boardList = [
    { name: "전체", id: 0, path: `/${basePath}` },
    { name: "E스포츠", id: 1, path: `/${basePath}/esports-news` },
    { name: "축구", id: 2, path: `/${basePath}/soccer-news` },
    { name: "야구", id: 3, path: `/${basePath}/baseball-news` },
    { name: "개선요청", id: 6, path: `/${basePath}/SUGGESTION` },
  ];

  const isCurrentPath = (boardPath: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts.includes("ALL") ? "" : pathParts[2] || "";
    const boardCategory = boardPath.split("/")[2] || "";

    return currentCategory === boardCategory;
  };

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-[160px] h-[364px]">
      <div className="w-full bg-[#FFFFFF]">
        {boardList.map((board) => (
          <div
            onClick={() => board.path && handleRoute(board.path)}
            key={board.id}
            className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
              isCurrentPath(board.path)
                ? "font-[700] text-[#00ADEE] bg-[#F8FDFF]"
                : "font-[400] text-[#424242] bg-[#FFFFFF]"
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
