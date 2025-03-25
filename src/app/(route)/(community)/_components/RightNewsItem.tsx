import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import { usePathname } from "next/navigation";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

interface NewsItemProps {
  newsItem: NewsItemType;
  customClass?: string;
}

const RightNewsItem = ({ newsItem, customClass }: NewsItemProps) => {
  const { handleRead } = useReadNews(newsItem?.id, false);
  const [read, setRead] = useState(false);
  const pathname = usePathname();
  const updatedImgUrl = updateImageUrl(newsItem?.thumbImg, "w68");
  const categoryPath = newsItem?.category?.toLowerCase() || "";

  useEffect(() => {
    const readNews = JSON.parse(localStorage.getItem("readNews") || "[]");
    const isReadInStorage = readNews.includes(newsItem?.id);
    const isCurrentPage = pathname === `/news/news-detail/${newsItem?.id}`;
    setRead(isReadInStorage || isCurrentPage);
  }, [newsItem?.id, pathname]);

  const titleStyle =
    "w-[184px] h-[24px] font-[700] text-[16px] leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap";
  const contentStyle =
    "w-[184px] h-[40px] text-[14px] leading-5 tracking-[0%] opacity-90 line-clamp-2 overflow-hidden";

  const styles = {
    title: `${titleStyle} ${read ? "text-gray5" : "text-gray9"}`,
    content: `${contentStyle} ${read ? "text-gray5" : "text-gray7"}`,
  };

  return (
    <Link
      href={`/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        newsItem?.id
      }`}
    >
      <div
        onClick={handleRead}
        className={`min-w-[288px] min-h-[92px] flex justify-start items-center border-b border-gray2 p-3 cursor-pointer gap-3 ${customClass}`}
      >
        <Image
          src={newsItem.thumbImg ? updatedImgUrl : "/Preview_loading_image.png"}
          alt="news img"
          width={68}
          height={68}
          className="w-[68px] h-[68px] rounded-[5px] object-cover"
        />
        <div className="min-w-[184px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
          <div className={styles.title}>{newsItem.title}</div>
          <div className={styles.content}>{newsItem?.content}</div>
        </div>
      </div>
    </Link>
  );
};

export default RightNewsItem;
