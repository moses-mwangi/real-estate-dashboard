"use client";

import React from "react";
import DashBoardNavbar from "./navbar/Navbar";
import DashBoardSideBar from "./sidebar/DashBoardSideBar";
import DashBoardMain from "./main/DashBoardMain";

export default function DashBoard() {
  return (
    <div className="">
      <div className="grid grid-cols-[1fr_4fr] h-svh">
        <DashBoardSideBar />
        <div className="h-svh">
          <DashBoardNavbar />
          <DashBoardMain />
        </div>
      </div>
    </div>
  );
}
