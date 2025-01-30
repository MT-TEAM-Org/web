import { ComunityToolbar } from "../_components/CommunityToolbar";
import PostItem from "../_components/PostItem";

const Baseball = () => {
  return (
    <div className="flex justify-center bg-[#FAFAFA] mt-3.5">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <ComunityToolbar />
        <PostItem />
        {Array.from({ length: 15 }).map((_, index) => (
          <PostItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default Baseball;
