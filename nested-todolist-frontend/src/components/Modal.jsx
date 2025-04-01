import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-light-primary"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
