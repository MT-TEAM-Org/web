// // ScheduleContainer 컴포넌트: 경기 일정 목록을 표시하는 컨테이너
// "use client";
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Arrow_right from "@/app/_components/icon/Arrow_right";
// import ScheduleItem from "./scheduleItem";
// import NoMatchImage from "@/app/_components/icon/Arrow_up"; // 경기 없음 이미지 컴포넌트

// const fetchSchedules = async () => {
//   const response = await axios.get("/api/schedules");
//   return response.data;
// };

// const scheduleContainer = () => {
//   const [page, setPage] = useState(0);
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["schedules"],
//     queryFn: fetchSchedules,
//   });

//   if (isLoading) return <p className="text-center">로딩 중...</p>;
//   if (error) return <p className="text-red-500">에러 발생: {error.message}</p>;

//   const schedules = data?.thisWeek || [];
//   const itemsPerPage = 4;
//   const paginatedSchedules = schedules.slice(
//     page * itemsPerPage,
//     (page + 1) * itemsPerPage
//   );

//   const filledSchedules = [
//     ...paginatedSchedules,
//     ...Array.from(
//       { length: Math.max(0, 4 - paginatedSchedules.length) },
//       (_, i) => <NoMatchImage key={`no-match-${i}`} />
//     ),
//   ];

//   return (
//     <div className="w-full min-h-[146px] flex gap-4 bg-[#F8FDFF] justify-center items-center overflow-hidden">
//       <div className="flex justify-center items-center gap-6">
//         <div className="max-w-[1136px] min-h-[98px] flex justify-between items-center gap-2">
//           {filledSchedules.map((item, index) =>
//             React.isValidElement(item) ? (
//               item
//             ) : (
//               <ScheduleItem key={index} schedule={item.schedule} />
//             )
//           )}
//         </div>

//         {schedules.length > 4 && (
//           <button
//             onClick={() =>
//               setPage(
//                 (prev) =>
//                   (prev + 1) % Math.ceil(schedules.length / itemsPerPage)
//               )
//             }
//             className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#FAFAFA] shadow-md"
//           >
//             <Arrow_right />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default scheduleContainer;
// ScheduleContainer 컴포넌트: 경기 일정 목록을 표시하는 컨테이너
import React from "react";
import Arrow_right from "@/app/_components/icon/Arrow_right"; // 오른쪽 화살표 아이콘 컴포넌트
import ScheduleItem from "./scheduleItem"; // 단일 경기 일정 컴포넌트

const ScheduleContainer = () => {
  return (
    // 전체 컨테이너: 배경색 및 중앙 정렬 스타일 적용
    <div className="w-full min-h-[146px] flex gap-4 bg-[#F8FDFF] justify-center items-center overflow-hidden">
      {/* 가운데 콘텐츠를 감싸는 래퍼 */}
      <div className="flex justify-center items-center gap-6">
        {/* 일정 목록: 최대 5개의 ScheduleItem 표시 */}
        <div className="max-w-[1136px] min-h-[98px] flex justify-between items-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            // ScheduleItem을 반복 렌더링 (총 5개)
            <ScheduleItem key={index} />
          ))}
        </div>

        {/* 오른쪽 화살표 버튼 */}
        <button
          className="w-[40px] h-[40px] rounded-[50%] flex justify-center items-center
          bg-[#FAFAFA] shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)]"
        >
          <Arrow_right />
        </button>
      </div>
    </div>
  );
};

export default ScheduleContainer;
