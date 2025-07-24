import { useRouter, useSearchParams } from "next/navigation";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

export const usePageChangeHandler = (totalPage?: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (page: number) => {
    if (page < 1 || (totalPage && page > totalPage)) return;

    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };
};