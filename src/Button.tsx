import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

const button = cva("rounded-3xl", {
  variants: {
    variant: {
      primary: "text-white bg-dark-purple hover:bg-light-purple",
      secondary: "text-dark-purple font-semibold bg-gray1 hover:bg-gray1",
      destructive: "text-white bg-destructive hover:bg-destructive-light",
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
  onClick: () => void;
}

export default function Button({
  children,
  size,
  variant,
  onClick,
}: IButtonProps) {
  return (
    <button onClick={onClick} className={button({ variant, size })}>
      {children}
    </button>
  );
}
