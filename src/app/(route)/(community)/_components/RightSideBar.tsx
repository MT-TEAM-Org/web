import NewsItem from "./NewsItem";

export const RightSideBar = () => {
  return (
    <>
      <div className="w-[288px] min-h-[808px] shadow-md">
        <div className="top-[314px] w-full min-h-[92px] bg-[#f8fdff] rounded-[10px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <NewsItem key={index} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-7 py-4">
          <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
            &lt;
          </button>
          <div>1 / 3</div>
          <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
            &gt;
          </button>
        </div>
      </div>
      <div className="w-[48px] h-[48px] bg-white rounded-lg shadow-md flex justify-center items-center my-5">
        <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 transform rotate-45"></div>
      </div>
    </>
  );
};