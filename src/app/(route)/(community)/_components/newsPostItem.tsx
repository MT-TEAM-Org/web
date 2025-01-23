import React from 'react';

const newsPostItem = () => {
  return (
    <div className='flex m-2 p-1 w-[720px] h-[116px]'>
      {/* img 대신 div */}
      <div className='w-[160px] h-[92px] bg-black mr-3 rounded-lg'></div>

      <div className="w-full flex flex-col gap-[4px] mr-3">
        <div className="flex items-center gap-[2px] w-[524px] h-[90px]">
          <h1 className="text-[16px] leading-[20px] text-[#181818] overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[calc(100%-100px)]">
          “올해도 라인 스와프 나옵니다”“올해도 라인 스와프 나옵니다”“올해도 라인 스와프 나옵니다”
          </h1>
          <p className="text-[12px] leading-[18px] text-[#00ADEE]">[24]</p>
          <div className="w-[22px] h-[18px] flex gap-[2px] flex-shrink-0">
            <p className="font-[900] text-[10px] leading-[18px] text-[#00ADEE]">
              N
            </p>
            <p className="font-[900] text-[10px] leading-[18px] text-[#DC2800]">
              H
            </p>
          </div>
        </div>
        <div>
          <p className='text-[14px] text-[#424242]'>
            탑라이너들은 올해도 바텀 1차 포탑에서 의연하게 다이브를 받아들여야 한다.2024시즌을 상징하는 전략 중 하나는 라인 스와프였다. 스프링 시즌 막바지 중국 LPL에서 처음 등장한 라인 스와프는 빠르게 전 세계로 퍼져나갔다. 곧 5월 미드 시즌 인비테이셔널(MSI)에서 주류 전략으로 자리매김했다.
          </p>
        </div>
        <div className="flex gap-[4px] text-[12px] leading-[18px] text-[#A6A6A6]">
          <p>축구</p>
          <p>1분전</p>
          <p>네이버 스포츠</p>
        </div>
      </div>

    </div>
  );
};

export default newsPostItem;