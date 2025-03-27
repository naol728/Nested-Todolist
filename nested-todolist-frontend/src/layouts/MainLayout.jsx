import React from "react";
import AppBar from "../components/AppBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <header>
        <AppBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
