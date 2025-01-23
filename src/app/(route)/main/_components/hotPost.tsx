import React from 'react';
import HotPostItem from './hotPostItem';

const hotPost = () => {
  return (
    <div className='my-5'>
      <h3 className='my-5 font-black'>실시간 HOT 게시글</h3>
      <div className='w-[419px] h-[360px] pl-5'>
        {Array.from({ length: 10 }).map((_, index) => (
          <HotPostItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default hotPost;