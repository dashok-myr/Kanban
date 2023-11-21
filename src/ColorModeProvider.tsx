"use client";
import { useLocalStorage } from "@/useLocalStorage";
import { createContext, ReactNode, useEffect } from "react";

export enum EColorMode {
  LIGHT = "light",
  DARK = "dark",
}

export const ColorModeContext = createContext<{
  colorMode: EColorMode;
  switchToDarkMode: () => void;
  switchToLightMode: () => void;
}>({
  colorMode: EColorMode.LIGHT,
  switchToDarkMode: () => {},
  switchToLightMode: () => {},
});

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useLocalStorage<EColorMode>(
    "color-mode",
    EColorMode.LIGHT
  );

  useEffect(() => {
    document.body.classList.add(colorMode);
  }, []);

  function switchToDarkMode() {
    setColorMode(EColorMode.DARK);
    document.body.classList.add("dark");
  }

  function switchToLightMode() {
    setColorMode(EColorMode.LIGHT);
    document.body.classList.remove("dark");
  }
  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        switchToDarkMode,
        switchToLightMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};
