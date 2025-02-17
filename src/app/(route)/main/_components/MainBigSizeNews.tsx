import React from "react";
import Image from "next/image";
import useFetchNewsData from "../../(community)/news/fetchNewsData";

const MainBigSizeNews = () => {
  const { data, isLoading } = useFetchNewsData();
  const mainPageData = data ? data[0] : null;
  console.log("mainPageData: ", mainPageData);

  const onClick = () => {
    console.log(mainPageData.id);
  };

  return (
    <div
      className="relative w-[410px] h-[236px] rounded-[10px] overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={
          mainPageData?.thumbImg ? mainPageData.thumbImg : "/mainNews_fake.png"
        }
        // 목 데이터
        alt="main news"
        width={410}
        height={236}
        className="w-[410px] h-[236px] rounded-[10px]"
      />
      <div className="absolute top-[128px] w-[410px] min-h-[108px] py-4 flex flex-col gap-2 bg-gradient-to-b from-[#00000000] to-[#000000]">
        <h3 className="w-[410px] h-[28px] font-bold text-[18px] leading-7 text-[#FFFFFF] tracking-[0.04em]">
          {isLoading ? "Loading..." : mainPageData?.title}
        </h3>
        <p className="w-[410px] h-[40px] opacity-90 font-medium text-[14px] leading-5 text-[#FFFFFF]">
          {isLoading ? "Loading..." : mainPageData?.title}
        </p>
      </div>
    </div>
  );
};

export default MainBigSizeNews;
