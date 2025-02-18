import { CommunityToolbar } from "../_components/CommunityToolbar";
import PostItem from "../_components/PostItem";

export const metadata = {
  title: "야구 페이지",
  description: "야구 페이지입니다.",
};

const Baseball = () => {
  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-[720px] w-full min-h-[120px] rounded-[5px] bg-[#FFFFFF] mx-auto]">
        <div className="flex flex-col">
          <div className="w-full">
            <CommunityToolbar />
          </div>
          <div className="w-full border-t flex justify-center items-center">
            <PostItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baseball;
