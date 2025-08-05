"use client"

import React, { useState } from "react"
import { cn } from "@/utils"
import { dashBoardTableData } from "@/app/(admin)/MockData";

const buttonTab = "w-1/3 h-[40px] mb-[16px] text-gray5 text-[14px] rounded-t-[5px] border-gray8 item-center font-medium";

const trStyle = "w-[100px] text-[14px]";
const tdStyle = "p-[8px]";
const TableType = ["신고", "문의", "개선요청"];
const RightDetail = () => {
  const [selectedTab, setSelectedTab] = useState<string>("신고");

  return (
    <div className="w-1/2 mg-[24px] text-[14px]">
      {/* 탭 메뉴 */}
      <div className="flex border-b">
        {TableType.map((tab) => (
          <button
            key={tab}
            className={cn(buttonTab, tab === selectedTab ? "border-x border-t font-bold text-gray7" : "border-b")}
            value={tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 리스트들 */}
      <table className="w-full h-[36px]">
        <thead>
          <tr className="bg-gray1">
            <th className="w-[100px] p-[8px]">처리상태</th>
            <th className="w-[100px]"> 신고 유형</th>
            <th>사유</th>
            <th className="w-[100px] ml-auto">신고날짜</th>
          </tr>
        </thead>

        {/* 표 데이터들 */}
        <tbody>
          {
            dashBoardTableData.map((item) => (
              <tr key={item.id} className="text-center border-b border-gray2">
                <td className={cn(tdStyle)}>
                  {item.processStatus}
                </td>
                <td>
                  {item.report}
                </td>
                <td>
                  {item.reason}
                </td>
                <td>
                  {item.date}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  )
}

export default RightDetail;