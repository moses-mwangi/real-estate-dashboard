import React from "react";
import DashBoardSideBar from "../../components/sidebar/SideBar";
import DashBoardNavbar from "../../components/navbar/Navbar";

export default function page() {
  return (
    <div className="">
      <div className="grid grid-cols-[1fr_4fr] h-svh">
        <DashBoardSideBar />
        <div className="">
          <DashBoardNavbar />
          {/* <AddPropertyPage /> */}
          VIEW
        </div>
      </div>
    </div>
  );
}
