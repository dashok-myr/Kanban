import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ColorModeProvider } from "@/ColorModeProvider";
import { BoardsProvider } from "@/BoardProvider";

export const metadata: Metadata = {
  title: "Kanban App",
  description: "Kanban app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ColorModeProvider>
        <BoardsProvider>
          <body>{children}</body>
        </BoardsProvider>
      </ColorModeProvider>
    </html>
  );
}
