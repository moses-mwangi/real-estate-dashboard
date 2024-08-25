"use client";

import React from "react";
import DashBoardSideBar from "../dashboard/sidebar/DashBoardSideBar";
import DashBoardNavbar from "../dashboard/navbar/DashBoardNavbar";
import AddingAgentPage from "./AddingAgentPage";

export default function Agent() {
  return (
    <div className="">
      <div className="grid grid-cols-[1fr_4fr] h-svh">
        <DashBoardSideBar />
        <div className="h-svh">
          <DashBoardNavbar />
          <AddingAgentPage />
        </div>
      </div>
    </div>
  );
}