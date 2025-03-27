import React from "react";

export default function Button({ children, type, onClick }) {
  const style = {
    add: " px-3 py-1 rounded-md font-semibold  focus:border-light-border bg-light-primary dark:text-dark-foreground  ",
    theam: "p-2 rounded-full bg-gray-200 dark:bg-gray-800",
  };
  return (
    <button onClick={onClick} className={style[type]}>
      {children}
    </button>
  );
}
