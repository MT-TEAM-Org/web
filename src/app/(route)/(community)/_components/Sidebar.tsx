const Sidebar = () => {
  const boardList = [
    { name: "전체", id: 0 },
    { name: "자유", id: 1 },
    { name: "질문", id: 2 },
    { name: "이슈", id: 3 },
    { name: "전적 인증", id: 4 },
    { name: "플레이 팁", id: 5 },
    { name: "개선요청", id: 6 },
  ];

  return (
    <div>
      <div className="sticky top-[314px] left-[360px] w-[160px] min-h-[364px] rounded-[5px] bg-[#FFFFFF]">
        {boardList.map((board) => (
          <div key={board.id} className="w-full h-[52px] px-[20px] py-[12px]">
            <p
              className={`${
                board.name === "전체"
                  ? "font-[700] text-[#00ADEE]"
                  : "font-[400] text-[#424242]"
              } leading-[28px]`}
            >
              {board.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
