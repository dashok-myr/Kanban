"use client";
import SideBar from "@/SideBar";
import React, { useState } from "react";
import classNames from "classnames";
import Board from "@/Board";
import BoardActionBar from "@/BoardActionBar";

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <main className="flex h-screen divide-x divide-violet-100 dark:divide-med-gray">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        onCloseSideBar={() => setIsSideBarOpen(false)}
      />
      <div
        className={classNames({
          "flex flex-col w-4/5 divide-y divide-violet-100 dark:divide-med-gray dark:bg-dark-gray":
            isSideBarOpen,
          "flex flex-col w-full relative dark:bg-dark-gray dark:divide-y dark:divide-med-gray":
            !isSideBarOpen,
        })}
      >
        <BoardActionBar />
        <div className="overflow-auto p-5 bg-light-gray dark:bg-dark-gray1 h-full">
          <Board />
        </div>
      </div>
    </main>
  );
}
