import FeedbackItem from "./items/FeedbackItem";
import NoticeItem from "../../notice/_components/items/NoticeItem";
import { FeedbackContentType } from "../../_types/FeedbackItemType";
import { NoticeContentType } from "../../_types/NoticeItemType";

type Props = {
  notices: NoticeContentType[];
  feedbacks: FeedbackContentType[];
  search: string | null;
  searchType: string | null;
};

const FeedbackListRenderer = ({
  notices,
  feedbacks,
  search,
  searchType,
}: Props) => {
  return (
    <>
      {notices.map((notice) => (
        <NoticeItem key={notice.id} noticeData={notice} isFeedback />
      ))}
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedbackData={feedback}
          searchString={search}
          searchType={searchType}
        />
      ))}
    </>
  );
};

export default FeedbackListRenderer;
