"use client";

const Esports = () => {
  const searchOptions = [
    { value: "1", label: "제목+내용" },
    { value: "2", label: "제목" },
    { value: "3", label: "내용" },
  ];

  const buttonStyle =
    "flex justify-center items-center h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";
  return (
    <div className="flex justify-center">
      <div className="w-[720px] min-h-[120px] rounded-[5px] border-b">
        <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
          <button className="defaultButtonColor w-[120px] min-h-[40px] rounded-[5px] px-[13px] py-[16px] text-white font-[700] text-[14px] leading-[14px]">
            글쓰기
          </button>
          <div className="flex items-center gap-[8px] w-[356px] h-[40px]">
            <select className="w-[120px] min-h-[40px] rounded-[5px] px-[12px] py-[16px] border">
              {searchOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-[14px] leading-[22px]"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="w-full h-[40px] rounded-[5px] border px-[12px] py-[6px]"
              placeholder="검색어를 입력해주세요."
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex w-full items-center gap-[4px]">
            <button className={buttonStyle}>최신순</button>
            <button className={buttonStyle}>인기순</button>
            <button className={buttonStyle}>댓글 많은 순</button>
          </div>

          <div>{/* 페이지네이션 */}</div>
        </div>
      </div>
    </div>
  );
};

export default Esports;
