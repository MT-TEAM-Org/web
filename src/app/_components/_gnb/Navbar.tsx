"use client";

import { useRouter } from "next/navigation";
import { Search } from "../icon/Search";

export default function Navbar() {
  const router = useRouter();

  const navbarClass =
    "min-h-[60px] p-[16px] whitespace-nowrap font-medium text-[18px] leading-[28px] text-center";

  const NavbarObject = [
    {
      name: "E스포츠",
      link: "/e-sports",
    },
    {
      name: "축구",
      link: "/baseball",
    },
    {
      name: "야구",
      link: "/soccer",
    },
    {
      name: "뉴스",
      link: "/schedule",
    },
    {
      name: "티키타카",
      link: "/news",
    },
    {
      name: "경기일정",
      link: "/chat",
    },
  ];
  return (
    <div className="w-full max-w-[1200px] min-h-[60px] flex justify-between items-center mx-auto">
      <div className="max-w-[447px] min-h-[60px] flex justify-around gap-2.5">
        {NavbarObject.map((item, index) => (
          <div
            key={index}
            className={`${navbarClass} flex justify-around items-center ${
              index === 0 ? "pl-0" : ""
            }`}
            onClick={() => router.push(item.link)}
          >
            {item?.name}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-2">
        <div className="relative w-[414px]">
          <input
            className="w-full min-h-[48px] py-[12px] px-[16px] border-[0.5px] rounded-full pl-10"
            placeholder="검색어를 입력해주세요"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
