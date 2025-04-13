import CustomIcon from "@/app/_components/IconComponents";
import React from "react";

const NewsItemIsError = () => {
  return (
    <div className="min-w-[436px] h-[68px] flex items-center justify-start">
      {/* <div className="w-[68px] h-[68px]">
        <CustomIcon
          icon="DEFAULT_THUMBNAIL_ICON"
          className="w-full h-full rounded-[5px] border"
        />
      </div> */}
      <div className="w-full h-full flex items-center justify-center border">
        <CustomIcon
          icon="DEFAULT_THUMBNAIL_ICON"
          className="w-[300px] h-[68px]"
        />
      </div>
    </div>
  );
};

export default NewsItemIsError;
