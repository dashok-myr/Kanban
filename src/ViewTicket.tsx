import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import { useState } from "react";
import { ITicket } from "@/BoardProvider";
import EditTicketModal from "@/EditTicketModal";

interface INewBoardModalProps {
  columnIndex: number;
  status: string;
  ticket: ITicket;
  onClose: () => void;
  onEditTicketClick: (newTicket: ITicket, selectedStatus: string) => void;
  onDeleteTicket: () => void;
}

export default function ViewTicketModal({
  status,
  ticket,
  onClose,
  onEditTicketClick,
  onDeleteTicket,
}: INewBoardModalProps) {
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);

  if (!ticket.title) {
    setShowEditTicketModal(false);
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button onClick={onClose} className="absolute right-4">
              <Image src={close} alt="close" />
            </button>
            <div>
              <label className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">
                {ticket.title}
              </label>
            </div>
            <div className="">
              <label className="block mb-2 text-sm text-gray dark:text-white">
                {ticket.description}
              </label>
            </div>
            <div className="my-4">
              <div className="text-sm font-semibold text-gray dark:text-white">
                Current Status
              </div>
              <div className="mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="text-gray-700 dark:text-white dark:bg-dark-gray block px-4 py-2 text-sm">
                  {status}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowEditTicketModal(true);
              }}
              className="flex self-end text-gray text-sm"
            >
              Edit
            </button>
            {showEditTicketModal && (
              <EditTicketModal
                onClose={() => {
                  setShowEditTicketModal(false);
                }}
                onEditTicketClick={onEditTicketClick}
                onDeleteTicket={onDeleteTicket}
                status={status}
                ticket={ticket}
              />
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
