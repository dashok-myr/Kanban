import Button from "@/Button";
import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import { useContext, useState } from "react";
import { BoardContext, ITicket } from "@/BoardProvider";

interface INewBoardModalProps {
  initialSelectedStatus: string;
  onClose: () => void;
  onCreateTicketSuccess: () => void;
}
//{ ...ticket, status: column.name }

export default function NewTicketModal({
  initialSelectedStatus,
  onClose,
  onCreateTicketSuccess,
}: INewBoardModalProps) {
  const { columns, appendTicketByColumnName } = useContext(BoardContext);
  const [ticket, setTicket] = useState<ITicket>({
    title: "",
    description: "",
    status: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(initialSelectedStatus);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button onClick={onClose} className="absolute right-4">
              <Image src={close} alt="close" />
            </button>
            <h3 className="text-xl font-semibold pb-5">Add New Ticket</h3>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                value={ticket.title}
                onChange={(e) => {
                  const copyObj = { ...ticket };
                  copyObj.title = e.target.value;
                  setTicket(copyObj);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-gray1 dark:border-dark-gray dark:placeholder-med-gray dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                value={ticket.description}
                onChange={(e) => {
                  const copyObj = { ...ticket };
                  copyObj.description = e.target.value;
                  setTicket(copyObj);
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
                            tabIndex={-1}
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
            <Button
              onClick={() => {
                appendTicketByColumnName(selectedStatus, ticket);
                onCreateTicketSuccess();
              }}
              variant="primary"
              size="large"
            >
              Create Ticket
            </Button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
