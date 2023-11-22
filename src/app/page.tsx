"use client";
import SideBar from "@/SideBar";
import Image from "next/image";
import ellipsis from "../../public/assets/icon-vertical-ellipsis.svg";
import close from "../../public/assets/icon-cross.svg";
import Button from "@/Button";
import React, { useContext, useState } from "react";
import classNames from "classnames";
import Board from "@/Board";
import { BoardContext } from "@/BoardProvider";
import NewTicketModal from "@/NewTicketModal";
import DeleteModal from "@/DeleteModal";

export default function Home() {
  const { board, deleteBoard, columns } = useContext(BoardContext);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  return (
    <main className="flex h-screen divide-x divide-violet-100 dark:divide-med-gray">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        onCloseSideBar={() => setIsSideBarOpen(false)}
      />
      <div
        className={classNames({
          "flex flex-col w-4/5 divide-y divide-violet-100 dark:divide-med-gray dark:bg-dark-gray":
            isSideBarOpen,
          "flex flex-col w-full relative dark:bg-dark-gray dark:divide-y dark:divide-med-gray":
            !isSideBarOpen,
        })}
      >
        <div className="flex justify-between m-4 items-center dark:bg-dark-gray">
          <button
            onClick={() => {
              setShowDeleteModel(true);
            }}
            className="flex items-center gap-3 text-xl font-semibold dark:text-white"
          >
            {board.name}
            <Image className="pt-0.5" src={close} alt="board" />
          </button>
          {showDeleteModel && (
            <DeleteModal
              titleLabel="Delete Board"
              descriptionLabel="Are you sure you want to delete this board? This action is not reversable."
              onClose={() => setShowDeleteModel(false)}
              onDelete={() => {
                deleteBoard(board);
              }}
            />
          )}
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => {
                setShowTicketModal(true);
              }}
              size="large"
              variant="primary"
            >
              + Add New Task
            </Button>
            {showTicketModal && (
              <NewTicketModal
                initialSelectedStatus={columns[0].name}
                onCreateTicketSuccess={() => {
                  setShowTicketModal(false);
                }}
                onClose={() => {
                  setShowTicketModal(false);
                }}
              />
            )}
            <Image className="h-5" src={ellipsis} alt="ellipsis" />
          </div>
        </div>
        <div className="overflow-auto p-5 bg-light-gray dark:bg-dark-gray1 h-full">
          <Board />
        </div>
      </div>
    </main>
  );
}
