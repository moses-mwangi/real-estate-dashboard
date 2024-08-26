import React from "react";
import DashBoardSideBar from "../../sidebar/DashBoardSideBar";
import DashBoardNavbar from "../../navbar/Navbar";

export default function UpdateProperty() {
  return (
    <div className="">
      <div className="grid grid-cols-[1fr_4fr] h-svh">
        <DashBoardSideBar />
        <div className="">
          <DashBoardNavbar />
          {/* <AddPropertyPage /> */}
          UPDATING
        </div>
      </div>
    </div>
  );
}
