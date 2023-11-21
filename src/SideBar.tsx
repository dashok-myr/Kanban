"use client";
import React, { useContext, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import boardIcon from "../public/assets/icon-board.svg";
import logoDark from "../public/assets/logo-dark.svg";
import logoLight from "../public/assets/logo-light.svg";
import eyeIcon from "../public/assets/icon-hide-sidebar.svg";
import ColorModeSwitcher from "@/ColorModeSwitcher";
import { ColorModeContext, EColorMode } from "@/ColorModeProvider";
import eyeOpen from "../public/assets/icon-show-sidebar.svg";
import { BoardContext, BOARDS } from "@/BoardProvider";
import NewBoardModal from "@/NewBoardModal";

interface ISideBarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseSideBar: () => void;
}

export default function SideBar({
  isSideBarOpen,
  setIsSideBarOpen,
  onCloseSideBar,
}: ISideBarProps) {
  const { colorMode } = useContext(ColorModeContext);
  const { selectedBoardIndex, setSelectedBoardIndex, boards } =
    useContext(BoardContext);

  const [showModal, setShowModal] = useState(false);

  function selectBoard(index: number) {
    setSelectedBoardIndex(index);
  }

  return (
    <div className="w-1/5">
      <div className="flex flex-col p-8 h-screen justify-between dark:bg-dark-gray">
        <div>
          {colorMode === EColorMode.LIGHT ? (
            <Image alt="logo" src={logoDark} />
          ) : (
            <Image alt="logo" src={logoLight} />
          )}
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
                  <div>{board.name}</div>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 items-center pt-3">
            <Image className="w-4 h-4" src={boardIcon} alt="board" />
            <button
              onClick={() => {
                setShowModal(true);
              }}
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              className="text-dark-purple"
              type="button"
            >
              + Create New Board
            </button>
            {showModal ? <NewBoardModal setShowModal={setShowModal} /> : null}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ColorModeSwitcher />
          <button onClick={onCloseSideBar} className="flex items-center gap-2">
            <Image src={eyeIcon} alt="eye" />
            <span className="text-gray">Hide Sidebar</span>
          </button>
        </div>
      </div>
      {!isSideBarOpen && (
        <button
          onClick={() => {
            setIsSideBarOpen(true);
          }}
          className="flex items-center justify-center bottom-5 absolute h-14 w-14 bg-dark-purple rounded-r-full"
        >
          <Image width="25" src={eyeOpen} alt="eyeOpen" />
        </button>
      )}
    </div>
  );
}
