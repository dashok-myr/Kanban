import Button from "@/Button";
import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import { useContext, useState } from "react";
import { BoardContext, ITicket } from "@/BoardProvider";
import DeleteModal from "@/DeleteModal";

interface INewBoardModalProps {
  status: string;
  ticket: ITicket;
  onClose: () => void;
  onEditTicketClick: (ticket: ITicket, selectedStatus: string) => void;
  onDeleteTicket: () => void;
}

export default function EditTicketModal({
  status,
  ticket,
  onClose,
  onEditTicketClick,
  onDeleteTicket,
}: INewBoardModalProps) {
  const { columns } = useContext(BoardContext);
  const [currentTicket, setCurrentTicket] = useState<ITicket>(ticket);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button onClick={onClose} className="absolute right-4">
              <Image src={close} alt="close" />
            </button>
            <h3 className="text-xl font-semibold pb-5">Edit Ticket</h3>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                value={currentTicket.title}
                onChange={(e) => {
                  const copyObj = { ...currentTicket };
                  copyObj.title = e.target.value;
                  setCurrentTicket(copyObj);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-med-gray dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <input
                value={currentTicket.description}
                onChange={(e) => {
                  const copyObj = { ...currentTicket };
                  copyObj.description = e.target.value;
                  setCurrentTicket(copyObj);
                }}
                type="text"
                className="h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-med-gray dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. It is alway good to take a break."
              />
            </div>
            <div className="my-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Status
              </div>
              <div className="relative text-left mt-3">
                <div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {selectedStatus}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    {columns.map((column, index) => {
                      return (
                        <div key={index} className="py-1" role="none">
                          <button
                            onClick={() => {
                              setSelectedStatus(column.name);
                              setIsDropdownOpen(false);
                            }}
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                          >
                            {column.name}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Button
                onClick={() => onEditTicketClick(currentTicket, selectedStatus)}
                variant="primary"
                size="large"
              >
                Update Ticket
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                variant="primary"
                size="large"
              >
                Delete Ticket
              </Button>
              {showDeleteModal && (
                <DeleteModal
                  titleLabel="Delete this ticket?"
                  descriptionLabel="Are you sure you want to delete this ticket? This action can not be reverse."
                  onClose={() => setShowDeleteModal(false)}
                  onDelete={onDeleteTicket}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
