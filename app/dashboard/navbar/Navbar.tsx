"use client";

import React, { useState } from "react";
import UserDetails from "./UserDetails";
import Modal from "@/app/components/Modal copy";

export default function DashBoardNavbar() {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div>
      {showUserModal === false ? (
        <UserDetails  />
      ) : (
        <Modal setShowUserModal={setShowUserModal}>
          <UserDetails  />
        </Modal>
      )}
    </div>
  );
}
