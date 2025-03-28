import React from "react";
import Button from "./Button";

export default function Modal({ isopen, setIsopen, children }) {
  console.log("dialog is open");
  return (
    <div className="fixed inset-0 flex items-center h-full w-full justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-dark-card flex flex-col  text-dark-foreground p-6 rounded-lg shadow-lg w-96">
        <div>{children}</div>
        <div className="text-right">
          <Button type="Cancel" onClick={() => setIsopen(!isopen)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
