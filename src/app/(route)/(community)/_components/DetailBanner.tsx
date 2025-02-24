"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import useGetBoardDetail from "@/_hooks/getBoardDetail";

const DetailBanner = () => {
  const params = useParams();
  const boardId = params.boardId as string;
  const { data, isLoading } = useGetBoardDetail(boardId);

  console.log(data);

  const getBannerUrl = () => {
    const boardType = data?.data?.boardType?.toLowerCase();

    switch (boardType) {
      case "esports":
        return "eSports_banner.png";
      case "baseball":
        return "baseball_banner.png";
      case "football":
        return "soccer_banner.png";
      default:
        return "default_banner.png";
    }
  };

  return (
    <header className="w-full h-[160px] relative">
      {isLoading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      ) : (
        <Image
          src={`/${getBannerUrl()}`}
          alt="banner"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      )}
    </header>
  );
};

export default DetailBanner;
