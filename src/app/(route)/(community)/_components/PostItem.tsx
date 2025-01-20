import Image from "next/image";

interface PostItemProps {
  announcement?: boolean;
  // post 객체를 받아와야 함
}

const PostItem = ({ announcement }: PostItemProps) => {
  return (
    <div className="flex items-center gap-[12px] min-h-[66px] p-[12px]">
      <div className="flex flex-shrink-0 justify-center items-center w-[32px] h-[32px] rounded-[2px] p-[4px] bg-[#FAFAFA]">
        <span className="font-[700] text-[14px] leading-[20px] text-[#424242]">
          11
        </span>
      </div>
      <Image
        src="/PostItem_fake.png"
        alt="post-preview-image"
        width={56}
        height={42}
        className="rounded-[5px] flex-shrink-0"
        blurDataURL="/Preview_loading_image.png"
      />
      <div className="w-full flex flex-col gap-[4px]">
        <div className="flex items-center gap-[2px]">
          <h1 className="text-[14px] leading-[20px] text-[#424242] overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[calc(100%-100px)]">
            와 손흥민지리네 쩐다 와 손흥민지리네 쩐다 와 손흥민지리네 쩐다와
            손흥민지리네 쩐다 와 손흥민지리네 쩐다
          </h1>
          <p className="text-[12px] leading-[18px] text-[#00ADEE]">[24]</p>
          <div className="w-[22px] h-[18px] flex gap-[2px] flex-shrink-0">
            <p className="font-[900] text-[10px] leading-[18px] text-[#00ADEE]">
              N
            </p>
            <p className="font-[900] text-[10px] leading-[18px] text-[#DC2800]">
              H
            </p>
          </div>
        </div>
        <div className="flex gap-[4px] text-[12px] leading-[18px] text-[#A6A6A6]">
          <p className="font-[700]">E스포츠</p>
          <p>자유</p>
          <p>1분전</p>
          <p>스포츠가조아여진심</p>
          <p className="text-[#CBCBCB]">IP 106.101.**.***</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
