"use client"

import Double_arrow_left from "@/app/_components/icon/Double_arrow_left";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Double_arrow_right from "@/app/_components/icon/Double_arrow_right";
import React from "react";
import { useRouter } from "next/navigation";

const NoticeTab = () => {
  const router = useRouter();

  const arrowBtnStyle =
    "w-[32px] h-[32px] flex gap-[10px] items-center justify-center rounded-[5px] p-[9px] border border-gray-300";

  const rows = Array.from({ length: 10 }, (_, index) => ({
    number: 10 - index,
    content:
      "제목입니다 제목입니다 제목입니다 제목입니다 제목입니다 제목입니다 제목입니다",
    date: "2025.02.03",
  }));

  const handlePageClick = () => {
    router.push('/customer/info')
  };


  return (
    <div className="min-w-[1200px] w-full min-h-[584px] h-auto flex gap-6 flex-col">
      <div>
        <table className="w-full min-h-[528px] h-auto">
          <thead className="w-[1200px] h-[48px] border-[#424242] border-t-[1px] flex">
            <tr className="bg-[#FAFAFA]">
              <th className="w-[160px] h-auto py-3 px-4 font-[500] text-[16px] leading-7 text-center">
                번호
              </th>
              <th className="w-[880px] h-auto py-3 px-4 font-[500] text-[16px] leading-7 text-center">
                공지내용
              </th>
              <th className="w-[160px] h-auto py-3 px-4 font-[500] text-[16px] leading-7 text-center">
                날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.number}
                className="w-[1200px] h-[48px] flex align-center justify-center items-center"
              >
                <td className="w-[160px] h-[48px] border-b border-gray-300 p-4 flex gap-[10px] justify-center items-center text-[#424242] text-[16px] leading-7 font-[400]">
                  {row.number}
                </td>
                <td className="w-[880px] h-[48px] border-b border-gray-300 p-4 flex gap-[10px] justify-start items-center text-[#424242] text-[16px] leading-7 font-[400] cursor-pointer" onClick={handlePageClick}>
                  {row.content}
                </td>
                <td className="w-[160px] h-[48px] border-b border-gray-300 p-4 flex gap-[10px] justify-center items-center text-[#424242] text-[16px] leading-7 font-[400]">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 페이지네이션 */}
      <div className="min-w-[352px] w-auto min-h-[32px] min-auto flex justify-center items-center gap-2 mb-[37px]">
        <div className="min-w-[72px] w-auto min-h-[32px] h-auto flex gap-2">
          <button className={arrowBtnStyle}>
            <Double_arrow_left />
          </button>
          <button className={arrowBtnStyle}>
            <Arrow_left />
          </button>
        </div>

        <div className="min-w-[192px] w-auto min-h-[32px] h-auto flex gap-2 text-center">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className="w-[32px] h-[32px] rounded-[5px] p-[9px] flex text-center items-center justify-center gap-2 border border-gray-300"
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="min-w-[72px] w-auto min-h-[32px] h-auto flex gap-2">
          <button className={arrowBtnStyle}>
            <Arrow_right />
          </button>
          <button className={arrowBtnStyle}>
            <Double_arrow_right />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeTab;
