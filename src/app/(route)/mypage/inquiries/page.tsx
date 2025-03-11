import MyPageInquiriesList from "./_components/MyPageInquiriesList";
import { Suspense } from "react";

const Inquiries = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-[720px] min-h-[450px] bg-[#FAFAFA] rounded-[5px]">
        <MyPageInquiriesList />
      </div>
    </Suspense>
  );
};

export default Inquiries;
