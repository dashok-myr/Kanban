import React, { useContext, useState } from "react";
import { BoardContext } from "@/BoardProvider";
import NewTicketModal from "@/NewTicketModal";
import ViewTicketModal from "@/ViewTicket";

interface IColumnProps {
  columnIndex: number;
}

export default function Column({ columnIndex }: IColumnProps) {
  const { columns, editTicket, deleteTicket } = useContext(BoardContext);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketIndex, setTicketIndex] = useState<number | null>(null);

  const column = columns[columnIndex];
  const { tickets } = column;

  if (tickets.length < 1) {
    return (
      <>
        <button
          onClick={() => {
            setShowNewTicketModal(true);
          }}
          className="text-gray font-semibold text-xl bg-gray1 dark:bg-dark-gray hover:dark:bg-med-gray h-full min-w-[300px] p-5 rounded-xl"
        >
          + New Ticket
        </button>
        {showNewTicketModal && (
          <NewTicketModal
            initialSelectedStatus={column.name}
            onCreateTicketSuccess={() => {
              setShowNewTicketModal(false);
            }}
            onClose={() => {
              setShowNewTicketModal(false);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      {tickets.map((ticket, ticketIndex) => (
        <React.Fragment key={ticketIndex}>
          <button onClick={() => setTicketIndex(ticketIndex)}>
            <div className="flex flex-col items-start bg-white hover:bg-light-gray dark:bg-dark-gray hover:dark:bg-med-gray dark:text-white gap-1 rounded-xl shadow-md p-7">
              <div className="text-lg font-semibold">{ticket.title}</div>
              <div className="text-gray">{ticket.description}</div>
            </div>
          </button>
        </React.Fragment>
      ))}
      {ticketIndex !== null && (
        <ViewTicketModal
          columnIndex={columnIndex}
          ticket={tickets[ticketIndex]}
          status={column.name}
          onClose={() => {
            setTicketIndex(null);
          }}
          onEditTicketClick={(newTicket, selectedStatus) => {
            setTicketIndex(null);
            editTicket(columnIndex, ticketIndex, newTicket, selectedStatus);
          }}
          onDeleteTicket={() => {
            setTicketIndex(null);
            deleteTicket(columnIndex, ticketIndex);
          }}
        />
      )}
    </>
  );
}
