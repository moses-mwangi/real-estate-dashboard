"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import UpdateCurrentUser from "./UpdateCurrentUser";
import UpdateCurrentUserPassword from "./UpdateCurrentUserPassword";
import Modal from "@/app/components/Modal";

interface ToggleDropdown {
  toggleDropdown: () => void;
}

export default function UserProfileSetting({ toggleDropdown }: ToggleDropdown) {
  const [toggleForm, setToggleForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    toggleDropdown();
  };

  return (
    <div>
      <div
        className="w-full cursor-pointer duration-150 transition-all text-gray-800 hover:text-blue-600 hover:bg-slate-100 rounded-sm pl-3 py-2"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-sm font-medium flex gap-3">
          <Settings className="w-5 h-5 text-gray-600" /> Settings
        </span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Customize your profile"
      >
        {toggleForm === false ? (
          <UpdateCurrentUser handleModalClose={handleModalClose} />
        ) : (
          <UpdateCurrentUserPassword handleModalClose={handleModalClose} />
        )}
        <p
          className="mt-6 flex text-blue-600 hover:text-blue-700 leading-6 text-[15px] font-medium cursor-pointer"
          onClick={() => setToggleForm((prev) => !prev)}
        >
          {toggleForm ? "Back to Profile" : "Change Password"}
        </p>
      </Modal>
    </div>
  );
}
