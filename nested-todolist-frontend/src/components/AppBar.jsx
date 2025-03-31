import React, { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Avatar from "./Avatar";
import useDarkMode from "../hooks/useDarkMode";
import { Switch } from "@headlessui/react";
import { IoMdAdd } from "react-icons/io";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";

import Logout from "./Logout";
import { useNavigate } from "react-router";
import { logoutUser } from "../features/authSlice";
export default function AppBar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isopen, setIsopen] = useState(false);
  const [openlogout, setOpenlogout] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    setOpenlogout(!openlogout);
    setTimeout(() => navigate("/"), 2000);
    window.location.href = "/";
  };
  return (
    <nav className="shadow-lg flex items-center justify-between bg-light-background dark:bg-dark-background p-4 md:px-8 transition-all duration-300">
      <div className="flex items-center space-x-2">
        <Logo />
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <div className="hidden sm:flex space-x-3">
              <Button type="add" onClick={() => setIsopen(!isopen)}>
                <IoMdAdd />
              </Button>

              {isopen ? (
                <Modal isopen={isopen} setIsopen={setIsopen}>
                  this is the modal
                </Modal>
              ) : (
                <></>
              )}
            </div>
            <Avatar onClick={() => setOpenlogout(!openlogout)} />

            {openlogout && (
              <Logout
                handleLogout={handleLogout}
                setOpenlogout={setOpenlogout}
                openlogout={openlogout}
              />
            )}
          </>
        )}

        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out ${
            isDarkMode
              ? "bg-dark-primary shadow-md shadow-blue-500/50"
              : "bg-gray-300"
          }`}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <span
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
              isDarkMode
                ? "translate-x-8 bg-gray-900"
                : "translate-x-0 bg-white"
            }`}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </span>
        </Switch>
      </div>
    </nav>
  );
}
