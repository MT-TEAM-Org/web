import { GameEventDataType } from "./EventType";
import { NewsListWithPageInfo } from "./NewsDataProps";

export type state = {
  newsIsLoading: boolean;
  newsIsError: boolean;
  eventIsLoading: boolean;
  eventIsError: boolean;
};

export type data = {
  filteredNewsData: NewsListWithPageInfo;
  gameEventData: GameEventDataType;
};

export type refetch = {
  refetchNewsData: () => void;
  refetchGameEvent: () => void;
};
