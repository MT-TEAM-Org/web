export type state = {
  newsIsLoading: boolean;
  newsIsError: boolean;
  eventIsLoading: boolean;
  eventIsError: boolean;
};

export type data = {
  filteredNewsData: any;
  gameEventData: any;
};

export type refetch = {
  refetchNewsData: () => void;
  refetchGameEvent: () => void;
};
