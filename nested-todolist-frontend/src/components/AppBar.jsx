import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

export default function AppBar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <nav className="bg-light-background shadow-lg flex items-center justify-between px-2 py-2 dark:bg-dark-background text-light-foreground dark:text-dark-foreground">
      <Logo />

      <div className="flex space-x-2 items-center justify-around">
        <Button type="add">+</Button>
        <div className="bg-light-secondary px-3 py-1 text-light-foreground border-light-border rounded-full font-semibold cursor-pointer">
          0
        </div>
        <Button onClick={() => setDarkMode(!darkMode)} type="theam">
          {darkMode ? "🌞" : "🌙 "}
        </Button>
      </div>
    </nav>
  );
}
