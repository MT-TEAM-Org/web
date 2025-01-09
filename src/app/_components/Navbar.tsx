"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const navbarCss =
    "font-semibold text-[17px] list-none pointer cursor-pointer";

  const NavbarObject = [
    {
      name: "E스포츠",
      link: "/esports",
    },
    {
      name: "야구",
      link: "/baseball",
    },
    {
      name: "축구",
      link: "/soccer",
    },
    {
      name: "경기일정",
      link: "/schedule",
    },
    {
      name: "뉴스",
      link: "/news",
    },
    {
      name: "하이브챗",
      link: "/chat",
    },
  ];
  return (
    <div className="max-w-6xl flex justify-between items-center mx-auto py-4">
      <div className="w-1/2 flex justify-around">
        {NavbarObject.map((item, index) => (
          <li
            key={index}
            className={navbarCss}
            onClick={() => router.push(item.link)}
          >
            {item?.name}
          </li>
        ))}
      </div>
      <div className="w-1/3 flex justify-center">
        <input
          className="w-[250px] h-[30px] p-2"
          placeholder="검색어를 입력해주세요"
        ></input>
      </div>
    </div>
  );
}
