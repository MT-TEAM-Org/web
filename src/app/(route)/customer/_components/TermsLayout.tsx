import React from "react";
import { cn } from "@/utils";

interface TermsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const TermsLayout = ({ title, children }: TermsLayoutProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm mb-10",
        "tablet:max-w-full",
        "mobile:max-w-[768px] mobile:mb-0"
      )}
    >
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center sticky top-0 z-10 border-gray2 bg-white">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">{title}</h1>
      </div>
      <div className="text-[14px] leading-[22px] text-gray6 p-3 mx-3">
        {children}
      </div>
    </div>
  );
};

export default TermsLayout;
