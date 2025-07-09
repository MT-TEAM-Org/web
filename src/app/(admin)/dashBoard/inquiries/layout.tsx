import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full min-h-[calc(100vh-64px)]">{children}</main>;
};

export default Layout;
