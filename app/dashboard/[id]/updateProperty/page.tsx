import React from "react";
import DashBoardSideBar from "../../../components/sidebar/SideBar";
import DashBoardNavbar from "../../../components/navbar/Navbar";
import UpdatePropertyForm from "./UpdatePropertyForm";

export default function UpdateProperty() {
  return (
    <div className="">
      {/* <div className="grid grid-cols-[1fr_4fr] h-svh"> */}
      <div className="grid grid-cols-1 md:grid-cols-[245px_auto] h-svh">
        <DashBoardSideBar />
        <div className="">
          <DashBoardNavbar />
          <UpdatePropertyForm />
        </div>
      </div>
    </div>
  );
}
