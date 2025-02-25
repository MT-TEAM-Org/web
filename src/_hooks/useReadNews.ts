import { useState, useEffect } from "react";

export const useReadNews = (newsItemId?: number, trackReadState = true) => {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (!trackReadState || !newsItemId) return;

    try {
      const readNews = JSON.parse(localStorage.getItem("readNews") || "[]");
      if (readNews.includes(newsItemId)) {
        setIsRead(true);
      }
    } catch (error) {
      console.error("로컬스토리지 저장 실패:", error);
    }
  }, [newsItemId, trackReadState]);

  const handleRead = () => {
    if (!newsItemId) return;

    try {
      const readNews = JSON.parse(localStorage.getItem("readNews") || "[]");
      if (!readNews.includes(newsItemId)) {
        readNews.push(newsItemId);
        localStorage.setItem("readNews", JSON.stringify(readNews));
        if (trackReadState) setIsRead(true);
      }
    } catch (error) {
      console.error("로컬스토리지 저장 실패:", error);
    }
  };

  return trackReadState ? { isRead, handleRead } : { handleRead };
};