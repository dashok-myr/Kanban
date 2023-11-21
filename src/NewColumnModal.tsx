import Button from "@/Button";
import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import { useContext, useState } from "react";
import { BoardContext } from "@/BoardProvider";

interface INewBoardModalProps {
  onClose: () => void;
  onCreateColumnSuccess: () => void;
}

export default function NewColumnModal({
  onClose,
  onCreateColumnSuccess,
}: INewBoardModalProps) {
  const { appendColumn } = useContext(BoardContext);
  const [boardInput, setBoardInput] = useState("");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button onClick={onClose} className="absolute right-4">
              <Image src={close} alt="close" />
            </button>
            <h3 className="text-xl font-semibold pb-5">Add New Column</h3>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Column name
              </label>
              <input
                value={boardInput}
                onChange={(e) => {
                  setBoardInput(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. DONE"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => {
                  appendColumn({ name: boardInput, tickets: [] });
                  onCreateColumnSuccess();
                }}
                variant="primary"
                size="large"
              >
                + Add New Column
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
