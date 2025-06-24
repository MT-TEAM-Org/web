import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="w-full min-h-[100vh] flex items-center justify-center bg-[#f8f8f8]">
        {children}
      </main>
    </div>
  );
};

export default layout;
