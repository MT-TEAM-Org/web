"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { category: '신고', '2024.6.3': 160, '2025.8.3': 98 },
  { category: '방문자', '2024.6.3': 150, '2025.8.3': 40 },
  { category: '가입자', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '탈퇴자', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '게시글', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '댓글', '2024.6.3': 30, '2025.8.3': 40 },
];

interface graphProps {
  todayStr: string;
  selected: string;
}

const GraphDetail = ({ todayStr, selected }: graphProps) => {

  // 최댓값 구하기
  const allValue = data.flatMap((item) => [
    item["2024.6.3"],  // 과거 날짜 들어갈 곳
    item["2025.8.3"],  // 현재 날짜 들어갈 곳
  ])

  const maxValue = Math.max(...allValue);

  const percentData = data.map((item) => ({
    category: item.category,
    ["2024.6.3"]: (item["2024.6.3"] / maxValue) * 100,
    ["2025.8.3"]: (item["2025.8.3"] / maxValue) * 100,
    // 원래 값 저장 (툴팁 등에서 사용하고 싶을 경우)
    origin: {
      ["2024.6.3"]: item["2024.6.3"],
      [todayStr]: item[todayStr],
    },
  }))
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={percentData} barGap={0} >
          <XAxis dataKey="category" />
          <YAxis domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]} // 마지막 눈금을 최대값으로 맞춰야 함
            tickFormatter={(value) => (value === 100 ? 'MAX' : `${value}`)} />
          <Tooltip formatter={(value, name, props) => {
            const original = props.payload.origin?.[name];
            return `${original ?? value}명`;
          }} />
          {/* 그래프 하단 날짜 */}
          <Legend content={() => null} />
          <Bar dataKey="2024.6.3" fill="#0369a1" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
          <Bar dataKey="2025.8.3" fill="#00ADEE" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer >
    </>
  )
}

export default GraphDetail;