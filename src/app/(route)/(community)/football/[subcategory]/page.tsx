import { CommunityToolbar } from "../../_components/CommunityToolbar";
import PostItem from "../../_components/PostItem";

export default function FootballPage() {
  return (
    <div className="flex justify-center bg-[#FAFAFA]">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <CommunityToolbar />
        <PostItem />
      </div>
    </div>
  );
}
