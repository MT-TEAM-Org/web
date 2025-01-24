import Fake_scheduleItem from '@/app/_components/icon/Fake_scheduleItem';
import Fake_scheduleItem2 from '@/app/_components/icon/Fake_scheduleItem2';
import React from 'react';

const scheduleItem = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[214px] h-[98px] bg-white rounded-lg shadow-md p-4">
      <div className="text-xs text-[#A6A6A6] mb-4">E스포츠</div>

      <div className="flex items-center justify-center gap-2">
        {/* T1 */}
        <div className="w-[55px] h-[48px] flex flex-col gap-1 items-center">
          <Fake_scheduleItem />
          <span className="text-base font-bold">T1</span>
        </div>
        {/* 중앙 */}
        <div className='flex flex-col gap-1 justify-center items-center'>
          <div className="text-[#CBCBCB] text-sm">VS</div>
          <div className="text-xs text-[#656565]">19:00 예정</div>
        </div>
        {/* 젠지 */}
        <div className="w-[55px] h-[48px] flex flex-col gap-1 items-center">
          <Fake_scheduleItem2 />
          <span className="text-base font-bold">젠지</span>
        </div>

      </div>

    </div>
  );
};

export default scheduleItem;