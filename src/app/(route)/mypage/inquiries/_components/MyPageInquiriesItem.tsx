interface MyPageInquiriesItemProps {
  data: {
    id: number;
    content: string;
    clientIp: string;
    createdAt: string;
    publicId: string;
    nickname: string;
    isAdminAnswered: string;
    commentCount: number;
  };
}

const MyPageInquiriesItem = ({ data }: MyPageInquiriesItemProps) => {
  const maskIP = (ip: string) => {
    if (!ip) return "";

    const parts = ip.split(".");
    if (parts.length !== 4) return ip;

    return `${parts[0]}.${parts[1]}.**.**`;
  };

  return (
    <div className="flex items-center gap-[12px] w-full min-h-[66px] border-b-1 border-[#FAFAFA] p-[12px]">
      <div className="min-w-[65px] h-[32px] rounded-[2px] px-[8px] py-[4px] bg-[#FAFAFA]">
        <p
          className={`font-[700] text-[14px] leading-[20px] ${
            data?.isAdminAnswered === "답변완료"
              ? "text-[#00ADEE]"
              : "text-gray7"
          }`}
        >
          {data?.isAdminAnswered}
        </p>
      </div>
      <div className="w-full min-h-[42px] flex flex-col gap-[4px]">
        <p className="w-full min-h-[20px] text-[14px] leading-[20px] text-gray7">
          {data?.content}
        </p>
        <div className="flex gap-[4px] text-gray5 text-[12px] leading-[18px]">
          <span className="font-[700]">문의</span>
          <span>1분 전</span>
          <span>{data?.nickname}</span>
          <span className="text-gray4">IP {maskIP(data?.clientIp)}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageInquiriesItem;
