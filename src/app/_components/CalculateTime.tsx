export const CalculateTime = (dateString: string) => {
  const now = new Date();
  const updateTime = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - updateTime.getTime()) / 1000
  );

  const timeUnits = [
    { name: "개월", seconds: 2592000 },
    { name: "주", seconds: 604800 },
    { name: "일", seconds: 86400 },
    { name: "시간", seconds: 3600 },
    { name: "분", seconds: 60 },
  ];

  if (diffInSeconds < 60) return "방금 전";

  for (const unit of timeUnits) {
    if (diffInSeconds >= unit.seconds) {
      const value = Math.floor(diffInSeconds / unit.seconds);
      return `${value}${unit.name} 전`;
    }
  }
};
