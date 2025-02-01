import React from 'react';
import NewPostItem from './NewPostItem';

const NewPost = () => {
  return (
    <div className="max-w-[419px] min-h-[392px] flex flex-col gap-2">
      <h3 className="font-[700] text-[16px] leading-6 align-center">
        실시간 최신 게시글
      </h3>
      <div className="max-w-[419px] min-h-[360px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <NewPostItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default NewPost;