import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import { usePathname } from "next/navigation";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";

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
    "w-[194px] h-[24px] font-[700] text-[16px] leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap mobile:w-full";
  const contentStyle =
    "w-[194px] h-[40px] text-[14px] leading-5 tracking-[0%] opacity-90 line-clamp-2 overflow-hidden mobile:w-full";

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
        className={cn(
          "min-w-[288px] min-h-[92px] flex justify-center items-center border-b border-gray2 p-3 cursor-pointer gap-3",
          customClass,
          "mobile:w-full mobile:max-w-[calc(100vw-32px)] mobile:mx-auto"
        )}
      >
        <div className="flex-shrink-0 w-[68px] h-[68px] rounded-[5px] overflow-hidden bg-gray1 relative">
          {updatedImgUrl ? (
            <Image
              src={updatedImgUrl}
              alt="news img"
              width={68}
              height={68}
              className="max-w-[68px] h-[68px] rounded-[5px] object-cover"
            />
          ) : (
            <CustomIcon
              icon="MAIN_DEFAULT_THUMBNAIL_ICON"
              className="max-w-[68px] h-[68px] object-cover"
            />
          )}
        </div>
        <div
          className={cn(
            "h-auto min-h-[68px] flex flex-col justify-center items-start gap-1 flex-1",
            "mobile:min-w-0"
          )}
        >
          <div className={styles.title}>{newsItem.title}</div>
          <div className={styles.content}>{newsItem?.content}</div>
        </div>
      </div>
    </Link>
  );
};

export default RightNewsItem;
