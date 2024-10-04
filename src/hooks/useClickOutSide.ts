import { RefObject, useEffect } from "react";

export const useClickOutSide = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const handleClick = (e: Event) => {
    if (ref?.current && !ref?.current.contains((e?.target as Node) || null)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
};
