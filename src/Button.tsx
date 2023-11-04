import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

const button = cva("rounded-3xl", {
  variants: {
    variant: {
      primary: "text-white bg-dark-purple hover:bg-light-purple",
      secondary: "text-purple-600 bg-purple-100 hover:bg-purple-300",
      destructive: "text-white bg-red hover:bg-red-300",
    },
    size: {
      small: "text-sm py-1 px-3",
      large: "text-base py-2 px-5",
    },
  },
});

interface IButtonProps extends PropsWithChildren {
  variant: "primary" | "secondary" | "destructive";
  size: "small" | "large";
}

export default function Button({ children, size, variant }: IButtonProps) {
  return <button className={button({ variant, size })}>{children}</button>;
}
