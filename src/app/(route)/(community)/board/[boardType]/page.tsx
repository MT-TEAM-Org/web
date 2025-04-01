import { use } from "react";

interface BoardParams {
  boardType: string;
}

const Board = ({ params }: { params: Promise<BoardParams> }) => {
  const unwrappedParams = use(params);
  const { boardType } = unwrappedParams;

  return null;
};

export default Board;
