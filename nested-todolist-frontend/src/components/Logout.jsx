import React from "react";
import Button from "./Button";

const Logout = ({ setOpenlogout, openlogout, handleLogout }) => {
  return (
    <div className="absolute top-16 right-20 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg   max-w-sm w-full">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-end text-xs space-x-3">
          <Button onClick={() => setOpenlogout(!openlogout)} type="Cancel">
            Cancel
          </Button>
          <Button onClick={handleLogout} type="danger">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
