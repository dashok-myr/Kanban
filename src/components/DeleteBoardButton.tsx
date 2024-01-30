import React, { useContext, useState } from "react";
import { BoardContext } from "@/BoardProvider";
import Image from "next/image";
import close from "../../public/assets/icon-cross.svg";
import DeleteModal from "@/DeleteModal";

export default function DeleteBoardButton() {
  const { board, deleteBoard } = useContext(BoardContext);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowDeleteModel(true);
        }}
      >
        <Image className="pt-0.5" src={close} alt="board" />
      </button>
      {showDeleteModel && (
        <DeleteModal
          titleLabel="Delete Board"
          descriptionLabel="Are you sure you want to delete this board? This action is not reversable."
          onClose={() => setShowDeleteModel(false)}
          onDelete={() => {
            deleteBoard(board);
            setShowDeleteModel(false);
          }}
        />
      )}
    </>
  );
}
