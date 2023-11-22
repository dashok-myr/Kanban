"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useLocalStorage } from "@/useLocalStorage";

export interface IBoard {
  name: string;
  columns: IColumn[];
}

export interface ITicket {
  title: string;
  description: string;
  status: string;
}

export interface IColumn {
  name: string;
  tickets: ITicket[];
}

export const BOARDS: IBoard[] = [
  {
    name: "Platform Launch",
    columns: [
      {
        name: "TODO",
        tickets: [
          {
            title: "Build UI for onboarding flow",
            description: "",
            status: "TODO",
          },
          {
            title: "ticket 1",
            description: "",
            status: "DOING",
          },
        ],
      },
      {
        name: "DOING",
        tickets: [
          {
            title: "ticket 2",
            description: "",
            status: "TODO",
          },
          {
            title: "ticket 3",
            description: "",
            status: "TODO",
          },
        ],
      },
      {
        name: "DONE",
        tickets: [
          {
            title: "ticket 4",
            description: "",
            status: "TODO",
          },
          {
            title: "ticket 5",
            description: "",
            status: "DOING",
          },
          {
            title: "ticket 6",
            description: "",
            status: "DONE",
          },
        ],
      },
    ],
  },
];

export const BoardContext = createContext<{
  board: IBoard;
  selectedBoardIndex: number;
  setSelectedBoardIndex: Dispatch<SetStateAction<number>>;
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  appendTicket: (columnIndex: number, ticket: ITicket) => void;
  appendColumn: (newColumn: IColumn) => void;
  appendTicketByColumnName: (columnName: string, ticket: ITicket) => void;
  editTicket: (
    columnIndex: number,
    ticketIndex: number,
    ticket: ITicket,
    selectedStatus: string
  ) => void;
  deleteColumn: (columnIndex: number) => void;
  deleteTicket: (columnIndex: number, ticketIndex: number) => void;
  deleteBoard: (selectedBoard: IBoard) => void;
  columns: IColumn[];
}>({
  board: {
    name: "",
    columns: [],
  },
  selectedBoardIndex: 0,
  setSelectedBoardIndex: () => {},
  boards: [],
  setBoards: () => {},
  appendTicket: () => {},
  appendColumn: () => {},
  appendTicketByColumnName: () => {},
  editTicket: () => {},
  deleteTicket: () => {},
  deleteColumn: () => {},
  deleteBoard: () => {},
  columns: [],
});

export const BoardsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
  const [boards, setBoards] = useLocalStorage<IBoard[]>("boards", BOARDS);

  const board = boards[selectedBoardIndex];
  const columns = boards[selectedBoardIndex].columns;

  function appendTicket(columnIndex: number, ticket: ITicket) {
    const copyBoars = [...boards];
    copyBoars[selectedBoardIndex].columns[columnIndex].tickets.push(ticket);
    setBoards(copyBoars);
  }

  function appendTicketByColumnName(columnName: string, ticket: ITicket) {
    const copyColumns = [...columns];
    const foundIndex = copyColumns.findIndex((newColumn) => {
      return newColumn.name === columnName;
    });
    appendTicket(foundIndex, ticket);
  }

  function editTicket(
    columnIndex: number,
    ticketIndex: number,
    newTicket: ITicket,
    selectedStatus: string
  ) {
    const copyBoards = [...boards];
    copyBoards[selectedBoardIndex].columns[columnIndex].tickets[ticketIndex] =
      newTicket;

    const newColumnIndex = columns.findIndex((newColumn) => {
      return newColumn.name === selectedStatus;
    });

    const shouldMoveTicket = columnIndex !== newColumnIndex;
    if (shouldMoveTicket) {
      copyBoards[selectedBoardIndex].columns[newColumnIndex].tickets.push(
        newTicket
      );
      copyBoards[selectedBoardIndex].columns[columnIndex].tickets.splice(
        ticketIndex,
        1
      );
    }

    setBoards(copyBoards);
  }

  function deleteTicket(columnIndex: number, ticketIndex: number) {
    const copyBoards = [...boards];

    copyBoards[selectedBoardIndex].columns[columnIndex].tickets.splice(
      ticketIndex,
      1
    );
    setBoards(copyBoards);
  }

  function deleteColumn(columnIndex: number) {
    const copyBoards = [...boards];
    copyBoards[selectedBoardIndex].columns.splice(columnIndex, 1);
    setBoards(copyBoards);
  }

  function deleteBoard(selectedBoard: IBoard) {
    const copyBoards = [...boards];
    const foundIndex = copyBoards.findIndex(
      (board) => board.name === selectedBoard.name
    );

    copyBoards.splice(foundIndex, 1);
    setSelectedBoardIndex(0);
    setBoards(copyBoards);
  }

  function appendColumn(newColumn: IColumn) {
    const copyColumns = [...columns];
    copyColumns.push(newColumn);
    const copyBoards = [...boards];
    copyBoards[selectedBoardIndex].columns = copyColumns;
    setBoards(copyBoards);
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        selectedBoardIndex,
        setSelectedBoardIndex,
        boards,
        setBoards,
        appendTicket,
        appendColumn,
        appendTicketByColumnName,
        editTicket,
        deleteTicket,
        deleteColumn,
        deleteBoard,
        columns,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
