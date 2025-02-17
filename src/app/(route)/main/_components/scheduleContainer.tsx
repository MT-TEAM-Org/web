"use client";

import React, { useState, useMemo } from "react";
import SingleArrowIconRight from "@/app/_components/icon/Arrow_right";
import WeekRange from "./weekRange";
import Image from "next/image";
import ScheduleItem from "./scheduleItem";

const ScheduleContainer = () => {
  const [counter, setCounter] = useState(0);
  const [weekRange, setWeekRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);

  const match = [
    {
      id: "1",
      date: "2025-02-17",
      time: "11:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "2",
      date: "2025-02-18",
      time: "19:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "3",
      date: "2025-02-22",
      time: "10:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "4",
      date: "2025-02-28",
      time: "21:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "5",
      date: "2025-02-24",
      time: "10:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "6",
      date: "2025-02-25",
      time: "23:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "7",
      date: "2025-11-22",
      time: "10:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
    {
      id: "8",
      date: "2025-03-13",
      time: "01:00",
      category: "2025 LCK CUP 그룹 배틀",
      team1: "한화 생명",
      team2: "DRX",
    },
  ];

  // 한 페이지에 표시할 항목 수 (슬라이드당 4개 항목)
  const itemsPerPage = 4;

  // 오른쪽 버튼 클릭 핸들러 (슬라이드 페이지 번호를 증가시키거나 처음으로 돌아감)
  const rightBtnClickHandler = () => {
    // 현재 페이지가 마지막 페이지보다 작으면 페이지 번호 증가
    // 마지막 페이지라면 첫 페이지로 돌아감
    const newCounter =
      counter < Math.ceil(match.length / itemsPerPage) - 1 ? counter + 1 : 0;

    // 페이지 번호가 변경되었으면 상태를 업데이트
    if (newCounter !== counter) {
      setCounter(newCounter);
    }
  };

  // 월요일을 기준으로 이번 주와 다음 주 일정만 필터링
  const filteredItems = useMemo(() => {
    const currentDate = new Date();

    // 이번 주 월요일 계산
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - dayOfWeek + 1); // 월요일로 설정

    // 다음 주 월요일 계산
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 14); // 14일 후

    const twoWeeksLater = nextMonday; // 이번 주 월요일부터 2주간의 일정

    // match 배열에서 월요일 기준 2주 이내의 일정만 필터링하고, 과거의 경기 제외
    return match.filter((item) => {
      const itemDate = new Date(`${item.date}T${item.time}`);
      return (
        itemDate >= monday &&
        itemDate <= twoWeeksLater &&
        itemDate > currentDate
      ); // 과거 경기 제외
    });
  }, [match]); // match가 변경될 때마다 필터링된 항목을 새로 계산

  // 정렬된 필터링된 항목을 슬라이드에 표시
  const sortedItems = useMemo(() => {
    return filteredItems.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime(); // 날짜가 빠른 순으로 정렬
    });
  }, [filteredItems]); // filteredItems가 변경될 때마다 정렬된 항목을 새로 계산

  // 현재 페이지에 해당하는 항목들을 계산
  const currentItems = useMemo(() => {
    // 현재 페이지에 해당하는 항목들을 추출
    const itemsToShow = sortedItems.slice(
      counter * itemsPerPage,
      (counter + 1) * itemsPerPage
    );

    // 부족한 항목 수 계산
    const emptyItemsCount = itemsPerPage - itemsToShow.length;
    // 부족한 항목을 "경기 없음" 이미지로 채움
    const emptyItems = Array.from({ length: emptyItemsCount }, (_, index) => ({
      id: `empty-${itemsToShow.length + index}`, // 고유한 id 값으로 변경
      imageUrl: "/_components/icons/", // "경기 없음" 아이콘 경로
    }));

    // 실제 항목들과 "경기 없음" 아이템들을 합쳐서 반환
    return [...itemsToShow, ...emptyItems];
  }, [counter, sortedItems]); // counter나 sortedItems가 변경될 때마다 새로 계산

  return (
    <div className="w-full min-h-[174px] flex gap-4 bg-[#F8FDFF] justify-center items-center overflow-hidden">
      <div className="flex justify-center items-center min-h-[126px] gap-3">
        <div className="max-w-[1200px] flex justify-between items-center gap-2">
          <WeekRange
            counter={counter}
            setWeekRange={setWeekRange}
            events={filteredItems}
            itemsPerPage={itemsPerPage}
          />
          {currentItems.map((match) =>
            "imageUrl" in match ? (
              <div
                key={match.id}
                className="rounded-[5px] w-[275px] h-[126px] bg-[#ffffff] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
              >
                <Image
                  src="/No_match.svg"
                  alt="No match available"
                  className="flex justify-center items-center object-fill"
                />
              </div>
            ) : (
              <ScheduleItem key={match.id} match={match} />
            )
          )}
        </div>

        <button
          onClick={rightBtnClickHandler}
          className="w-[40px] h-[40px] rounded-[50%] flex justify-center items-center bg-[#FAFAFA] shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)]"
        >
          <SingleArrowIconRight />
        </button>
      </div>
    </div>
  );
};

export default ScheduleContainer;
