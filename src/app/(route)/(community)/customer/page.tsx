import Customer_pencil from '@/app/_components/icon/Customer_pencil';
import React from 'react';
import TableWithPagination from './_components/TableWithPagination';

export const metadata = {
  title: "PlayHive 고객센터 페이지",
  description: "PlayHive 고객센터 페이지입니다.",
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* 고객센터 부분 */}
      <div className="w-full flex justify-start ml-[510px]">
        <h1 className="text-[28px] leading-[40px] font-[700] mt-[34px] mb-6">고객센터</h1>
      </div>
      <div className="max-w-[1200px] min-h-[72px] flex gap-4 justify-center items-center bg-[#FAFAFA] px-6 py-4 rounded-lg">
        <Customer_pencil />
        <span className="text-[18px] font-[700] w-[1008px] text-start mr-[40px]">
          궁금한 내용을 1:1 문의하기에 남겨주세요.
        </span>
        <button className="w-[120px] min-h-[52px] bg-[#00ADEE] rounded-md text-white text-[14px] font-[500]">
          1:1 문의하기
        </button>
      </div>
      
      <div className="max-w-[1200px] min-h-[72px] flex items-center my-6">
        <button className="w-[300px] h-[52px] text-black font-bold border-t border-r rounded-tl-md rounded-tr-md border-black px-4 py-2 text-center">
          공지사항
        </button>
        <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-2 text-center">개선요청</button>
        <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-2 text-center">이용약관</button>
        <button className="w-[300px] h-[52px] text-[#A6A6A6] font-bold border-b-2 border-[#DBDBDB] px-4 py-2 text-center">개인정보 취급방침</button>
      </div>
      
      <TableWithPagination />
    </div>
  );
};

export default page;