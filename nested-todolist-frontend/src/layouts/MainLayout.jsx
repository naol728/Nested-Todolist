import React from "react";
import AppBar from "../components/AppBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <header>
        <AppBar />
      </header>
      <main className="bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground min-h-dvh p-6">
        <Outlet />
      </main>
    </>
  );
}
