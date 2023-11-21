import Button from "@/Button";
import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import { useContext, useState } from "react";
import { BoardContext, IColumn } from "@/BoardProvider";

interface INewBoardModalProps {
  setShowModal: (value: boolean) => void;
}

export default function NewBoardModal({ setShowModal }: INewBoardModalProps) {
  const { boards, setBoards } = useContext(BoardContext);
  const [boardInput, setBoardInput] = useState("");
  const [columns, setColumns] = useState<IColumn[]>([
    { name: "", tickets: [] },
  ]);

  function createNewBoard() {
    const copyArr = [...boards];
    copyArr.push({
      name: boardInput,
      columns: columns.filter((column) => !!column.name),
    });
    setBoards(copyArr);
    setShowModal(false);
  }

  function addNewColumn() {
    setColumns([...columns, { name: "", tickets: [] }]);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="absolute right-4"
            >
              <Image src={close} alt="close" />
            </button>
            <h3 className="text-xl font-semibold pb-5">Add New Board</h3>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Board name
              </label>
              <input
                value={boardInput}
                onChange={(e) => {
                  setBoardInput(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Web Design"
              />
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Board columns
              </div>
              {columns.map((column, index) => {
                return (
                  <div className="flex gap-3 items-center justify-center mt-3">
                    <input
                      value={column.name}
                      onChange={(e) => {
                        const copyArr = [...columns];
                        copyArr[index].name = e.target.value;
                        setColumns(copyArr);
                      }}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. TODO"
                    />
                    <Image src={close} alt="close" />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <Button
                onClick={() => addNewColumn()}
                variant="secondary"
                size="large"
              >
                + Add New Column
              </Button>
              <Button
                onClick={() => {
                  createNewBoard();
                }}
                variant="primary"
                size="large"
              >
                Create New Board
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
