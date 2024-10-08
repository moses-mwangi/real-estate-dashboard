"use client";

import React from "react";
import DashBoardSideBar from "../components/sidebar/SideBar";
import DashBoardNavbar from "../components/navbar/Navbar";
import AddingAgentPage from "./AddingAgentPage";

export default function Agent() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-[245px_auto] h-svh">
        <DashBoardSideBar />
        <div className="h-svh">
          <DashBoardNavbar />
          <AddingAgentPage />
        </div>
      </div>
    </div>
  );
}
