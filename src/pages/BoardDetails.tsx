import React from "react";
import { BoardDetails } from "@/components/boards/board-details";
import { useParams } from "react-router-dom";

const BoardDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return <BoardDetails />;
};

export default BoardDetailsPage;