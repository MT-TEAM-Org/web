import React, { useEffect, useMemo } from "react";

// 주어진 주 오프셋(weekOffset)에 맞는 시작일과 종료일을 계산하여 반환
export const getWeekRange = (weekOffset: number) => {
  const today = new Date();

  // 현재 주의 월요일을 구하기
  today.setDate(today.getDate() - today.getDay() + 1);

  // 계산된 월요일 날짜에서 weekOffset을 적용해 첫 번째 날짜 설정
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() + weekOffset * 7);

  const startDate = firstDayOfWeek; // 주간의 시작일
  const endDate = new Date(startDate); // 주간의 종료일
  endDate.setDate(startDate.getDate() + 6); // 종료일은 시작일로부터 6일 후

  return { startDate, endDate }; // 시작일과 종료일 반환
};

// 시간 정보를 기준으로 정렬하는 함수
const sortByDateAndTime = (events: { date: string; time: string }[]) => {
  // 원본 배열을 복사하여 정렬 (원본 배열의 변형 방지)
  return [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
};

interface WeekRangeProps {
  counter: number; // 현재 주 오프셋 (슬라이드 페이지와 관련)
  setWeekRange: (range: { startDate: Date; endDate: Date }) => void; // 계산된 주간 범위를 부모에 전달하는 함수
  events: { date: string; time: string }[]; // 날짜와 시간 정보가 포함된 이벤트 배열
  itemsPerPage: number; // 한 페이지에 표시할 항목 수
}

const WeekRange: React.FC<WeekRangeProps> = ({
  counter,
  setWeekRange,
  events,
  itemsPerPage,
}) => {
  // counter 값에 따라 주간 범위를 계산하고, 이를 캐시합니다.
  const computedWeekRange = useMemo(() => getWeekRange(counter), [counter]);
  const { startDate, endDate } = computedWeekRange;

  // 이번 주 월요일 계산
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - dayOfWeek + 1); // 월요일로 설정

  // 다음 주 월요일 계산
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 14); // 14일 후

  // 이벤트 필터링 (이번 주와 다음 주 일정, 그리고 현재 시간 이후)
  const filteredItems = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      return (
        eventDate >= monday &&
        eventDate <= nextMonday &&
        eventDate > currentDate
      ); // 이번 주와 다음 주 일정 필터링 + 현재 시간 이후
    });
  }, [events]);

  // events 배열을 날짜와 시간 기준으로 정렬 (불필요한 재계산을 피하기 위해 useMemo 사용)
  const sortedItems = useMemo(() => {
    return sortByDateAndTime(filteredItems);
  }, [filteredItems]);

  // useMemo를 사용하여 성능을 최적화하고, 의존성 배열에 변경 사항이 있을 때만 재계산합니다.
  const currentItems = useMemo(() => {
    // 현재 페이지에 해당하는 아이템만 슬라이스해서 반환합니다.
    return sortedItems.slice(
      // 현재 페이지의 첫 번째 아이템 인덱스: counter * itemsPerPage
      // 예: 0 페이지 -> 0 * 10 = 0 번째 아이템부터
      counter * itemsPerPage,

      // 현재 페이지의 마지막 아이템 인덱스: (counter + 1) * itemsPerPage
      // 예: 0 페이지 -> (0 + 1) * 10 = 10 번째 아이템까지
      (counter + 1) * itemsPerPage
    );
  }, [counter, sortedItems, itemsPerPage]); // counter, sortedItems, itemsPerPage가 변경될 때마다 재계산

  // startDate, endDate를 부모 컴포넌트에 전달
  useEffect(() => {
    setWeekRange({ startDate, endDate });
  }, [computedWeekRange, setWeekRange]);

  return null; // 데이터는 부모 컴포넌트에 전달
};

export default WeekRange;
