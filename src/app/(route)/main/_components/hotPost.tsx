import React from 'react';
import HotPostItem from './hotPostItem';

const hotPost = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-black'>실시간 HOT 게시글</h3>
      <div className='max-w-[419px] max-h-[360px] pl-3'>
        {Array.from({ length: 10 }).map((_, index) => (
          <HotPostItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default hotPost;