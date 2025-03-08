import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <div className="text-center w-[265px] h-[282px] flex flex-col gap-6">
        <div className="w-full min-h-[218px] flex gap-3 flex-col">
          <h1 className="max-w-[265px] font-bold text-[90px] leading-[124px] tracking-[-0.05em] text-gray9 ">
            404
          </h1>

          <div className=" flex flex-col w-[265px] h-[82px] px-3 gap-2">
            <h2 className="text-[24px] font-bold leading-[38px] tracking-[-0.04em] text-gray8">
              페이지를 찾을 수 없습니다.
            </h2>
            <p className="text-[20px] font-medium leading-[36px] tracking-[-0.02em] text-gray7">
              다음에 다시 시도해주세요.
            </p>
          </div>
        </div>
        <Link
          href={"/"}
          className="w-[120px] h-[40px] flex justify-center items-center mx-auto px-4 py-[13px] border rounded-[5px] border-gray3 text-center bg-white"
        >
          <p className=" h-[14px] text-[14px] leading-[14px] font-bold  text-gray7">
            홈으로
          </p>
        </Link>
      </div>
    </div>
  );
}
