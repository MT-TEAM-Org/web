import MypageLeftSidebar from "./_components/MypageLeftSidebar";

export const metadata = {
  title: "마이페이지",
  description: "마이페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fafafa] min-h-[calc(100vh-476px)] pb-[40px]">
      <div className="max-w-[1200px] mx-auto pt-[40px] pb-[20px]">
        <h1
          className="text-[28px] font-[700] leading-[40px]"
          style={{ letterSpacing: "-4%" }}
        >
          마이페이지
        </h1>
      </div>
      <div className="mt-[20px] max-w-[1200px] flex mx-auto gap-[20px]">
        <div className="w-[160px] min-h-[364px]">
          <div className="sticky top-0">
            <MypageLeftSidebar />
          </div>
        </div>
        <div className="flex-1 max-w-[720px]">{children}</div>
      </div>
    </div>
  );
}
