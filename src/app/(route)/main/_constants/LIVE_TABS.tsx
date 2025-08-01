import HotPost from "../_components/live/hotPost";
import NewPost from "../_components/live/NewPost";

export const LIVE_TABS = [
  {
    id: "hot",
    label: "실시간 HOT 게시글",
    component: <HotPost />,
  },
  {
    id: "new",
    label: "실시간 최신 게시글",
    component: <NewPost />,
  },
];
