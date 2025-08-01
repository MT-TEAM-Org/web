import React from "react";
import EventItemSkeleton from "../state/EventItemSkeleton";
import EmptyGameBox from "../state/EmptyGameBox";
import EventItem, { GameEventData } from "../state/EventItem";
import { cn } from "@/utils";
import RightNewsItem from "@/app/(route)/(community)/_components/RightNewsItem";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import RightNewsItemSkeleton from "@/app/(route)/(community)/_components/RightNewsItemSkeleton";
import {
  data,
  refetch,
  state,
} from "@/app/(route)/main/_types/MainRightBarType";

interface MainContentSectionProps {
  buttonActive: boolean;
  data: data;
  state: state;
  skeletonCount: number;
  refetch: refetch;
}

const MainContentSection = ({
  buttonActive,
  data,
  state,
  skeletonCount,
  refetch,
}: MainContentSectionProps) => {
  const handleRefresh = () => {
    if (buttonActive) {
      refetch?.refetchNewsData?.();
    } else {
      refetch?.refetchGameEvent?.();
    }
  };
  return (
    <div
      className={cn(
        "w-full h-auto max-h-[736px] flex flex-col gap-2",
        "tablet:min-w-[348px] tablet:max-h-[292px] tablet:overflow-hidden",
        "mobile:max-h-[292px] mobile:overflow-hidden"
      )}>
      {buttonActive ? (
        <>
          {state.newsIsLoading ? (
            <>
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <RightNewsItemSkeleton key={`news-skeleton-${i}`} />
              ))}
            </>
          ) : state.newsIsError || !data.filteredNewsData?.content?.length ? (
            <EmptyGameBox title="뉴스 정보" onClick={handleRefresh} />
          ) : (
            data.filteredNewsData.content.map((data: NewsItemType) => (
              <RightNewsItem
                key={data.id}
                newsItem={data}
                wrapperWidth={298}
                customClass={cn(
                  "max-w-[298px] h-[92px] border rounded-[5px] border-gray2 bg-white p-3",
                  "tablet:max-w-full tablet:min-w-[194px]",
                  "mobile:max-w-full"
                )}
              />
            ))
          )}
        </>
      ) : (
        <>
          {state.eventIsLoading ? (
            <>
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <EventItemSkeleton key={`event-skeleton-${i}`} />
              ))}
            </>
          ) : state.eventIsError || !data.gameEventData?.content?.length ? (
            <EmptyGameBox title="게임 이벤트 정보" onClick={handleRefresh} />
          ) : (
            data.gameEventData.content.map((event: GameEventData) => (
              <EventItem key={event.id} gameEventData={event} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MainContentSection;
