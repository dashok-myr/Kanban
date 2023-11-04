"use client";
import React, { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import boardIcon from "../public/assets/icon-board.svg";
import boardWhite from "../public/assets/icon-board-white.svg";
import logo from "../public/assets/logo-dark.svg";

const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

export default function Navbar() {
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  function selectBoard(index: number) {
    setSelectedBoardIndex(index);
  }

  return (
    <div className="flex flex-col m-8">
      <Image alt="logo" src={logo} />
      <div className="mt-8 tracking-widest text-gray text-sm mb-5">
        ALL BOARDS (3)
      </div>
      <div className="flex flex-col gap-3">
        {boards.map((board, index) => {
          return (
            <button
              key={index}
              onClick={() => selectBoard(index)}
              className={classNames(
                "flex gap-3 items-center text-gray h-10 w-48 rounded-r-3xl hover:bg-light-purple hover:text-dark-purple",
                {
                  "text-white bg-dark-purple": selectedBoardIndex === index,
                }
              )}
            >
              <Image className="w-4 h-4" src={boardIcon} alt="board" />
              <div>{board}</div>
            </button>
          );
        })}
      </div>
      <div className="flex gap-3 items-center pt-3">
        <Image className="w-4 h-4" src={boardIcon} alt="board" />
        <button className="text-dark-purple">+ Create New Board</button>
      </div>
    </div>
  );
}
