import React from 'react';
import Image from 'next/image';
import Single_logo from '@/app/_components/icon/Single_logo';
import Share from '@/app/_components/icon/Share';
import Coppy from '@/app/_components/icon/Coppy';
import Refresh from '@/app/_components/icon/Refresh';

const page = () => {
  return (
    <>
      <div className='flex flex-col w-[720px] min-h-[1051px] bg-white p-[24px]'>
        <div className='flex flex-col gap-2 max-w-[672px] min-h-[84px] mt-6 mb-2 rounded-sm'>
        <h1 className="font-bold text-[18px] leading-[28px]">토트넘 강등? 손흥민 선제골 '쾅'→수비 '와르르' 2실점…아스널 원정서 1-2 역전패→충격의 13위 [PL 리뷰]</h1>

          <div className='flex justify-between color-[#EEEEEE] pb-4'>
            <div className='flex gap-2 color-[#656565] text-[14px]'>
              <div className='flex gap-1'>
                <p>축구</p>
                <p>1분 전</p>
              </div>
              <div className='flex gap-1'>
                <p>조회수 161</p>
                <p>댓글 2</p>
              </div>
              <div className='flex gap-1'>
                <p>추천</p>
                <p>12</p>
              </div>
            </div>
            <div className='text-[14px] color-[#656565]'>
              <p>네이버 스포츠</p>
            </div>
          </div>
          <hr />
          <div className='mt-4'>
            <Image 
              src="/Fake_newsInfo.png"
              alt="Fake News"
              width={672}
              height={338}
              className='mb-3'
            />
            <p>(엑스포츠뉴스 나승우 기자) 토트넘 홋스퍼가 손흥민의 귀중한 선제골을 지키지 못하고 아스널 원정에서 역전패를 당했다. 이날 명단 포함이 기대됐던 한국 유망주 양민혁은 직전 FA컵 경기에 이어 아예 명단 제외됐다. 토트...</p>
          </div>
          <div className='flex justify-center'>
            <button className='flex items-center text-[14px] justify-center gap-1 w-[120px] h-[40px] mt-4 bg-[#00ADEE] text-[#FFFFFF] rounded-[5px]'>
              <Single_logo />
              추천 12
            </button>
          </div>

          <div className='flex justify-between mb-4'>
            <button className='w-[104px] h-[32px] text-[14px] font-[500] bg-[#FFFFFF] px-3 py-2 rounded-md border border-[#DBDBDB]'>
            기사 원문 보기
            </button>
            <div className='flex gap-2'>
              <button className='w-[138px] h-[32px] text-[14px] flex justify-center gap-1 items-center bg-[#FFFFFF] px-3 py-2 rounded-md border border-[#DBDBDB]'>
                <Coppy/>
                게시글 URL 복사
                </button>
              <button className='w-[91px] h-[32px] text-[14px] flex justify-center gap-1 items-center bg-[#FFFFFF] px-3 py-2 rounded-md border border-[#DBDBDB]'>
                <Share/>
                공유하기
                </button>
            </div>
          </div>
          <div>
          <div className='w-[672px] h-[48px] flex justify-between align-center items-center bg-[#FAFAFA] text-[#656565] rounded-md'>
            <div className='flex gap-2 ml-4'>
              <h1>댓글</h1>
              <p>총 12개</p>
            </div>
            <div className='flex justify-center items-center gap-2 mr-4'>
              <Refresh />
              <p>새로고침</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;