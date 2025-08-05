"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { category: '신고', pastDay: '2024.6.3', pastData: 160, currentDay: '2025.8.3', currentData: 98 },
  { category: '방문자', pastDay: '2024.6.3', pastData: 140, currentDay: '2025.8.3', currentData: 40 },
  { category: '가입자', pastDay: '2024.6.3', pastData: 40, currentDay: '2025.8.3', currentData: 30 },
  { category: '탈퇴자', pastDay: '2024.6.3', pastData: 40, currentDay: '2025.8.3', currentData: 30 },
  { category: '게시글', pastDay: '2024.6.3', pastData: 40, currentDay: '2025.8.3', currentData: 30 },
  { category: '댓글', pastDay: '2024.6.3', pastData: 40, currentDay: '2025.8.3', currentData: 30 },
];

interface graphProps {
  todayStr: string;
  selected: string;
}

const GraphDetail = ({ todayStr, selected }: graphProps) => {

  // 최댓값 구하기
  const maxValue = Math.max(
    ...data.flatMap(item => [item.pastData, item.currentData])
  );

  const percentData = data.map((item) => ({
    category: item.category,
    [item.pastDay]: (item.pastData / maxValue) * 75,
    [item.currentDay]: (item.currentData / maxValue) * 75,
    origin: {
      [item.pastDay]: item.pastData,
      [item.currentDay]: item.currentData,
    },
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={percentData} barGap={0} >
        <XAxis dataKey="category" />
        <YAxis domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]} // 마지막 눈금을 최대값으로 맞춰야 함
          tickFormatter={(value) => (value === 100 ? 'MAX' : `${value}`)} />
        <Tooltip />
        {/* <Tooltip /> */}
        {/* 그래프 하단 날짜 */}
        <Legend content={() => null} />
        <Bar dataKey="2024.6.3" fill="#0369a1" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
        <Bar dataKey="2025.8.3" fill="#00ADEE" radius={[4, 4, 0, 0]} barSize={10} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer >
  )
}

export default GraphDetail;