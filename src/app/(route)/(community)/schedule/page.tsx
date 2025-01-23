import React from 'react';
import { ComunityToolbar } from '../_components/CommunityToolbar';
import NewsPostItem from '../_components/newsPostItem';

const page = () => {
  return (
    <div className="flex justify-center bg-[#FAFAFA] mt-3.5">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <ComunityToolbar />
        {Array.from({ length: 15 }).map((_, index) => (
          <NewsPostItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;