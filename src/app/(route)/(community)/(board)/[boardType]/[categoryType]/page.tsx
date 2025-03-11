import { use } from "react";
import { CommunityToolbar } from "../../../_components/CommunityToolbar";
import PostItem from "../../../_components/PostItem";

interface categiotyType {
  boardType: string;
  categoryType: string;
}
export default function Category({
  params,
}: {
  params: Promise<categiotyType>;
}) {
  const unwrappedParams = use(params);
  const { boardType, categoryType } = unwrappedParams;

  return (
    <div className="w-[720px] flex justify-center bg-[#FAFAFA]">
      <div className="w-full min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <CommunityToolbar boardType={boardType} />
        <PostItem boardType={boardType} categoryType={categoryType} />
      </div>
    </div>
  );
}
