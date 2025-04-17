"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import useMyPostList from "@/_hooks/useMyPostList";
import MyPagePostItem from "./MyPagePostItem";
import MyPagePostEmpty from "./MypagePostEmpty";
import { useSearchParams } from "next/navigation";
import { PostListConfig, PostListData } from "../_types/postTypes";
import MypagePostSkelton from "./MypagePostSkelton";
import MobileBackButtonWrapper from "../../_components/MobileBackButton";
import Pagination from "../../_components/Pagination";
import { useRouter } from "next/navigation";
import changeURLParams from "../../util/changeURLParams";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";

const MyPagePostList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postOptions: PostListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 5,
    orderType:
      (searchParams.get("order_type") as PostListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("search_type") as PostListConfig["searchType"]) ||
      "CONTENT",
    search: searchParams.get("search") || "",
  };
  const { data, isLoading } = useMyPostList(postOptions);
  const { content, pageInfo } = data?.data?.list || {};
  const isMobile = useIsMobile();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageInfo.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div>
      <MobileBackButtonWrapper mode="posts" />
      <MypageToolbar mode="posts" pageInfo={pageInfo} />
      <div className="flex flex-col w-full bg-[#FFFFFF] rounded-b-[5px]">
        {pageInfo?.totalElement !== 0 ? (
          content?.map((post: PostListData["content"][number]) => (
            <MyPagePostItem key={post.id} data={post} />
          ))
        ) : (
          <MyPagePostEmpty height={isMobile ? "h-[500px]" : "h-[248px]"} />
        )}
        {isLoading && <MypagePostSkelton />}
        <div
          className={cn(
            "hidden",
            `mobile:block mobile:mt-[12px] mobile:mx-auto mobile:mb-[24px] mobile:${
              pageInfo?.totalElement === 0 ? "hidden" : "block"
            }`
          )}
        >
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPagePostList;
