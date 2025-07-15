import useDeleteRecommend from "@/_hooks/fetcher/news/useDeleteRecommend";
import usePatchRecommend from "@/_hooks/fetcher/news/usePatchRecommend";
import { useState } from "react";
import { useAdminRole } from "../../customer/_utils/adminChecker";
import { QueryClient } from "@tanstack/react-query";
import { NewsListType } from "../_types/newsListItemType";

interface UseNewsRecommendProps {
  id: string;
  newsInfoData: NewsListType;
  queryClient: QueryClient;
}

const useNewsRecommend = ({ id, newsInfoData, queryClient }: UseNewsRecommendProps) => {
  const adminRole = useAdminRole();
  const { mutate: newsAddRecommend } = usePatchRecommend();
  const { mutate: newsDeleteRecommend } = useDeleteRecommend();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleNewsCommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = newsInfoData?.recommend;
    const newsAction = isRecommended ? newsDeleteRecommend : newsAddRecommend;

    newsAction(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getNewsInfo", id] });
      },
    });
  };

  return { handleNewsCommend, isSignInModalOpen, setIsSignInModalOpen };
};

export default useNewsRecommend;