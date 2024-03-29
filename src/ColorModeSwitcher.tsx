import Image from "next/image";
import sun from "../public/assets/icon-light-theme.svg";
import moon from "../public/assets/icon-dark-theme.svg";
import React, { useContext } from "react";
import { ColorModeContext, EColorMode } from "@/ColorModeProvider";
import classNames from "classnames";

export default function ColorModeSwitcher() {
  const { colorMode, switchToDarkMode, switchToLightMode } =
    useContext(ColorModeContext);

  return (
    <div className="flex justify-center items-center gap-3 bg-light-gray dark:bg-dark-gray1 w-full h-10 rounded-lg">
      <Image alt="sun" src={sun} />
      <button
        onClick={() => {
          if (colorMode === EColorMode.LIGHT) {
            switchToDarkMode();
          } else {
            switchToLightMode();
          }
        }}
        className="pt-1"
      >
        <input
          className={classNames(
            "mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']",
            {
              "bg-primary bg-neutral-600 after:bg-neutral-400 checked:bg-primary checked:after:bg-primary checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] after:absolute after:z-[2] after:-mt-[3px] after:ml-[1.0625rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-primary after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] focus:border-primary focus:bg-primary focus:before:ml-[1.0625rem] focus:before:scale-100 focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] focus:before:transition-[box-shadow_0.2s,transform_0.2s]":
                colorMode === "dark",
            }
          )}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="flexSwitchCheckDefault"
        ></label>
      </button>
      <Image alt="moon" src={moon} />
    </div>
  );
}
