"use client";

import React from "react";
import DashBoardSideBar from "../components/sidebar/SideBar";
import DashBoardNavbar from "../components/navbar/Navbar";
import AddPropertyPage from "./AddPropertyPage";

export default function Property() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-[245px_auto] h-svh">
        <DashBoardSideBar />
        <div className="">
          <DashBoardNavbar />
          <AddPropertyPage />
        </div>
      </div>
    </div>
  );
}
