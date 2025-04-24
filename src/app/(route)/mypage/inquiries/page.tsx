import { cn } from "@/utils";
import MyPageInquiriesList from "./_components/MyPageInquiriesList";
import { Suspense } from "react";

const Inquiries = () => {
  return (
    <Suspense fallback={""}>
      <div
        className={cn(
          "pc:min-h-[450px] bg-[#FAFAFA] rounded-[5px]",
          "tablet:mb-[40px]",
          "mobile:bg-white"
        )}
      >
        <MyPageInquiriesList />
      </div>
    </Suspense>
  );
};

export default Inquiries;
