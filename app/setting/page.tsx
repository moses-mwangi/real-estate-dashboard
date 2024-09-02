import React from "react";
import DashBoardSideBar from "../components/sidebar/DashBoardSideBar";
import DashBoardNavbar from "../components/navbar/Navbar";

export default function SettingPage() {
  return (
    <div className="">
      <div className="grid grid-cols-[1fr_4fr] h-svh">
        <DashBoardSideBar />
        <div className="h-svh">
          <DashBoardNavbar />
          SETTING
        </div>
      </div>
    </div>
  );
}
