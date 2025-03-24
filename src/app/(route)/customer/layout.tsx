import React from "react";
import CustomerLeftSidebar from "./_components/CustomerLeftSidebar";
import RightSidebarWrapper from "./_components/RightSidebarWrapper";

export const metadata = {
  title: "PlayHive 고객센터 페이지",
  description: "고객센터 페이지입니다.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="w-[1200px] min-h-[120px] flex items-center">
        <h1 className="font-bold text-[28px] leading-10 tracking-[-0.04em] ">
          고객센터
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto flex gap-4 items-start justify-center">
        <div className="w-[160px] min-h-[260px] rounded-5px bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] sticky top-[0]">
          <CustomerLeftSidebar />
        </div>
        <div className="min-h-[calc(100vh-476px)]">{children}</div>
        <div className="mb-[42px] sticky top-[0]">
          <RightSidebarWrapper />
        </div>
      </div>
    </div>
  );
};

export default Layout;
