import Double_arrow_left from "@/app/_components/icon/Double_arrow_left";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Double_arrow_right from "@/app/_components/icon/Double_arrow_right";
import React from "react";

const TableWithPagination = () => {
  const rows = Array.from({ length: 10 }, (_, index) => ({
    number: 10 - index,
    content:
      "제목입니다 제목입니다 제목입니다 제목입니다 제목입니다 제목입니다 제목입니다",
    date: "2025.02.03",
  }));

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <table className="w-full border-collapse border-gray-300">
        <thead>
          <tr className="bg-[#EEEEEE]">
            <th className="w-[160px] py-2 px-4 text-center">번호</th>
            <th className="w-[880px] py-2 px-4 text-center">공지내용</th>
            <th className="w-[160px] py-2 px-4 text-center">날짜</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.number} className="h-[48px]">
              <td className="border-b border-gray-300 py-2 px-4 text-center text-[#424242] text-[16px] leading-[28px] font-[400]">
                {row.number}
              </td>
              <td className="border-b border-gray-300 py-2 px-4 text-[#424242] text-[16px] leading-[28px] font-[400]">
                {row.content}
              </td>
              <td className="border-b border-gray-300 py-2 px-4 text-center text-[#424242] text-[16px] leading-[28px] font-[400]">
                {row.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button className="flex items-center justify-center w-[32px] h-[32px] rounded-md border border-gray-300">
          <Double_arrow_left />
        </button>
        <button className="flex items-center justify-center w-[32px] h-[32px] rounded-md border border-gray-300">
          <Arrow_left />
        </button>
        <div className="flex gap-2 items-center text-center">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className="w-[32px] h-[32px] rounded-md px-3 py-1 border border-gray-300"
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button className="flex items-center justify-center w-[32px] h-[32px] rounded-md border border-gray-300">
          <Arrow_right />
        </button>
        <button className="flex items-center justify-center w-[32px] h-[32px] rounded-md border border-gray-300">
          <Double_arrow_right />
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
