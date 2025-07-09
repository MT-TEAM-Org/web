import Header from "@/app/_components/_gnb_admin/Header";
import Navbar from "@/app/_components/_gnb_admin/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <div className="flex">
        <aside className="min-h-[calc(100vh-64px)] bg-Fifth text-white flex flex-col">
          <Navbar />
        </aside>

        <main className="flex-1 p-6">
          <div className="w-full h-full ">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
