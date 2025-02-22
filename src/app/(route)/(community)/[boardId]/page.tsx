import BoardDetail from "./_components/BoardDetail";

const Page = ({ params }: { params: { boardId: string } }) => {
  return <BoardDetail boardId={params.boardId} />;
};

export default Page;
