import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import Avatar from "./Avatar";
import useDarkMode from "../hooks/useDarkMode";

export default function AppBar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className=" shadow-lg flex items-center justify-between  bg-light-background dark:bg-dark-background p-4 ">
      <Logo />

      <div className="flex space-x-2 items-center justify-around">
        <Button type="add">+</Button>
        <Avatar />
        <Button onClick={toggleDarkMode} type="theam">
          {isDarkMode ? "🌞" : "🌙 "}
        </Button>
      </div>
    </nav>
  );
}
