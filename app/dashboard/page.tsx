"use client";

import React from "react";
import DashBoardNavbar from "../components/navbar/Navbar";
import DashBoardSideBar from "../components/sidebar/SideBar";
import DashBoardMain from "../components/main/DashBoard";

export default function DashBoard() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-[245px_auto] h-svh">
        <div className="md:block hidden">
          <DashBoardSideBar />
        </div>
        <div className="h-svh">
          <DashBoardNavbar />
          <DashBoardMain />
        </div>
      </div>
    </div>
  );
}
