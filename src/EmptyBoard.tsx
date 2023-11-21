import Button from "@/Button";
import React, { useState } from "react";
import NewColumnModal from "@/NewColumnModal";

export default function EmptyBoard() {
  const [showColumnModal, setShowColumnModal] = useState(false);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-5">
        <span className="text-gray">
          This board is empty. Create a new board to get started.
        </span>
        <Button
          onClick={() => {
            setShowColumnModal(true);
          }}
          size="large"
          variant="primary"
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
        >
          + Add New Column
        </Button>
        {showColumnModal && (
          <NewColumnModal
            onClose={() => setShowColumnModal(false)}
            onCreateColumnSuccess={() => setShowColumnModal(false)}
          />
        )}
      </div>
    </div>
  );
}
