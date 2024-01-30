import Button from "@/Button";
import NewTicketModal from "@/NewTicketModal";
import React, { useContext, useState } from "react";
import { BoardContext } from "@/BoardProvider";
import DeleteBoardButton from "@/components/DeleteBoardButton";

export default function BoardActionBar() {
  const { board, columns } = useContext(BoardContext);
  const [showTicketModal, setShowTicketModal] = useState(false);

  return (
    <div className="flex justify-between m-4 items-center dark:bg-dark-gray">
      <div className="flex gap-3 items-center">
        <div className="text-xl font-semibold dark:text-white">
          {board.name}
        </div>
        <DeleteBoardButton />
      </div>
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
      </div>
    </div>
  );
}
