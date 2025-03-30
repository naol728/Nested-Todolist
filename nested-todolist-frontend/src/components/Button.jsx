import React from "react";

export default function Button({ children, type, onClick, loading, styles }) {
  const style = {
    add: " bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg",
    theam:
      "bg-light-secondary dark:bg-dark-secondary text-white px-4 py-2 rounded-lg",

    Cancel:
      "bg-light-secondary dark:bg-dark-secondary text-white px-4 py-2 rounded-lg",
    delete: "bg-danger text-white px-4 py-2 rounded-lg",
    success: "bg-success text-white px-4 py-2 rounded-lg",
    warning: "bg-warning text-white px-4 py-2 rounded-lg",
    submit:
      "w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded-lg font-medium text-lg transition-all hover:opacity-90",
    close:
      "mt-4 bg-light-primary dark:bg-dark-primary text-white  px-4 py-2 rounded-lg w-full",
  };
  return (
    <button
      onClick={onClick}
      className={style[type]}
      type={styles}
      disabled={loading}
    >
      {children}
    </button>
  );
}
