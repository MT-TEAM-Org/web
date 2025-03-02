import { useState, useEffect } from "react";

const useTimeAgo = (newsTime: string | undefined) => {
  const [timeAgo, setTimeAgo] = useState<string>("알 수 없음");

  useEffect(() => {
    if (!newsTime) {
      setTimeAgo("알 수 없음");
      return;
    }

    const newsDate = new Date(newsTime);
    const now = new Date();
    const diffMs = now.getTime() - newsDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      setTimeAgo(`${diffDays}일 전`);
    } else if (diffHours > 0) {
      setTimeAgo(`${diffHours}시간 전`);
    } else if (diffMinutes > 0) {
      setTimeAgo(`${diffMinutes}분 전`);
    } else {
      setTimeAgo("방금 전");
    }
  }, [newsTime]);

  return timeAgo;
};

export default useTimeAgo;