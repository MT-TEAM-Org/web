import changeURLParams from "../../mypage/util/changeURLParams";
import { useRouter, useSearchParams } from "next/navigation";

export const usePageChange = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number, searchData: any) => {
    if (page < 1 || page > searchData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return handlePageChange;
};