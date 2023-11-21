import Column from "@/Column";
import React, { useContext, useState } from "react";
import { BoardContext } from "@/BoardProvider";
import EmptyBoard from "@/EmptyBoard";
import NewColumnModal from "@/NewColumnModal";
import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import DeleteModal from "@/DeleteModal";

export default function Board() {
  const { board, columns, deleteColumn } = useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndexColumn, setDeleteIndexColumn] = useState<number>(-1);

  if (!columns.length) {
    return <EmptyBoard />;
  }

  return (
    <div className="flex flex-nowrap overflow-auto gap-5 h-screen">
      {board.columns.map((column, columnIndex) => {
        return (
          <div
            key={columnIndex}
            className="flex flex-col min-w-[300px] max-w-sm gap-5"
          >
            <div className="flex justify-between items-center">
              <div className="text-gray tracking-widest">{column.name}</div>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeleteIndexColumn(columnIndex);
                }}
                className="flex gap-2 items-center group"
              >
                <span className="text-sm text-gray invisible group-hover:visible">
                  delete
                </span>
                <Image
                  className="h-3 w-3 invisible group-hover:visible"
                  src={close}
                  alt="close"
                />
              </button>
              {showDeleteModal && (
                <DeleteModal
                  titleLabel="Delete this column?"
                  descriptionLabel="Are you sure you want to delete this colum? This action will delete all ticket in the current colum."
                  onClose={() => setShowDeleteModal(false)}
                  onDelete={() => {
                    deleteColumn(deleteIndexColumn);
                    setShowDeleteModal(false);
                  }}
                />
              )}
            </div>
            <Column columnIndex={columnIndex} />
          </div>
        );
      })}
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="text-gray font-semibold text-xl bg-gray1 dark:bg-dark-gray hover:dark:bg-med-gray h-full min-w-[300px] p-5 rounded-xl mt-11"
      >
        + New Column
      </button>
      {showModal && (
        <NewColumnModal
          onClose={() => setShowModal(false)}
          onCreateColumnSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
