import React from 'react';
import ScheduleContainer from '../../main/_components/ScheduleContainer';
import ChatScheduleContainer from './_components/ChatScheduleContainer';

export const metadata = {
  title: "경기일정 페이지",
  description: "경기일정 페이지입니다.",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <ScheduleContainer />
      <div className='flex flex-col gap-6'>
        <ChatScheduleContainer title="E스포츠"/>
        <ChatScheduleContainer title="축구"/>
        <ChatScheduleContainer title="야구"/>
      </div>
    </div>
  );
};

export default Page;