import PostItem from "../../(community)/_components/PostItem";
import { MypageToolbar } from "../_components/MypageToolbar";

const Inquiries = () => {
  return (
    <div className="max-w-[720px] min-h-[450px] bg-[#FFFFFF] rounded-[5px]">
      <MypageToolbar mode="inquries" />
      {Array.from({ length: 5 }).map((_, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
};

export default Inquiries;
