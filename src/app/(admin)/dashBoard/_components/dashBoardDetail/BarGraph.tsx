"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { category: '신고', '2024.6.3': 98, '2025.8.3': 98 },
  { category: '방문자', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '가입자', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '탈퇴자', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '게시글', '2024.6.3': 30, '2025.8.3': 40 },
  { category: '댓글', '2024.6.3': 30, '2025.8.3': 40 },
];

interface graphProps {
  todayStr: string;
  selected: string;
}

const BarGraph = ({ todayStr, selected }: graphProps) => {

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={0} >
          <XAxis dataKey="category" />
          <YAxis domain={[0, 'dataMax']}
            ticks={[0, 20, 40, 60, 80, 100]} // 마지막 눈금을 최대값으로 맞춰야 함
            tickFormatter={(value) => (value === 100 ? 'MAX' : value)} />
          <Tooltip />
          {/* 그래프 하단 날짜 */}
          <Legend content={() => null} />
          <Bar dataKey="2024.6.3" fill="#0369a1" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
          <Bar dataKey={todayStr} fill="#00ADEE" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer >
    </>
  )
}

export default BarGraph;