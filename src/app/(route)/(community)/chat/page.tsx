import React from 'react';
import ScheduleContainer from '../../main/_components/scheduleContainer';
import ChatScheduleContainer from './_components/chatScheduleContainer';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
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