import React from "react";
import Image from "next/image";
import MenuBtn from "../_components/MenuBtn";

const page = () => {
  const nextButtonStyle =
    "w-[160px] h-[52px] rounded-[5px] border border-[#DBDBDB] px-4 py-[13px] flex gap-[10px] justify-center items-center font-[700] text-[16px] leading-4 text-[#424242]";

  return (
    <div className="mt-[40px] flex flex-col items-center justify-center">
      <div className="w-[1200px] h-[116px] flex flex-col gap-6 mb-[46px]">
        <div>
          <h1 className="font-[700] text-[28px] leading-[40px]">공지사항</h1>
        </div>
        <div>
          <MenuBtn />
        </div>
      </div>

      <div className="w-[1200px] min-h-[879px] flex flex-col justify-center mb-[84px]">
        <div className="w-full min-h-[80px] flex border-t-[1px] border-[#424242]">
          <div className="w-[1040px] h-auto px-4 py-3 flex gap-[10px]">
            <h6 className="font-[500] text-[16px] leading-[28px]">
              안녕하세요 플레이 하이브 운영팀입니다. 2025 새해복
              많이받으세요안녕하세요 플레이 하이브 운영팀입니다. 2025 새해복
              많이받으세요안녕하세요 플레이 하이브 운영팀입니다. 2025 새해복
              많이받으세요안녕하세요 플레이 하이브 운영팀입니다. 2025 새해복
              많이받으세요
            </h6>
          </div>
          <div className="w-[160px] h-[80px] flex items-center px-4 py-3 gap-[10px] border-[#EEEEEE] font-[500] text-[18px] leading-7 tracking-[-0.72px]">
            <p>2025.01.07</p>
          </div>
        </div>

        <div className="w-full min-h-[798px] py-4 flex flex-col gap-6">
          <div>
            <Image
              src="/Fake_customerInfo.png"
              alt="customer_info"
              width={1200}
              height={686}
            />
          </div>
          <div>
            <p>
              텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다텍스트입니다
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-[40px]">
        <button className={nextButtonStyle}>이전글</button>
        <button className={nextButtonStyle}>다음글</button>
        <button className={`${nextButtonStyle} bg-[#00ADEE] text-[#FFFFFF]`}>
          목록보기
        </button>
      </div>
    </div>
  );
};

export default page;
