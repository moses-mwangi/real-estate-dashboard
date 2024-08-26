"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import UpdateCurrentUserPassword from "./UpdateCurrentUserPassword";
import UpdateCurrentUser from "./UpdateCurrentUser";

interface ToggleDropdown {
  toggleDropdown: () => void;
}

export default function UserProfileSetting({ toggleDropdown }: ToggleDropdown) {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=" w-full">
          <div className="w-full cursor-pointer duration-150 transition-all text-gray-800 hover:text-blue-600 hover:bg-slate-100 rounded-sm pl-3 py-2">
            <span className=" text-sm font-medium flex gap-3">
              <Settings className=" w-5 h-5 text-gray-600" /> Settings
            </span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
          <AlertDialogHeader>
            <AlertDialogTitle>Customize your profile</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            {toggleForm === false ? (
              <UpdateCurrentUser />
            ) : (
              <UpdateCurrentUserPassword />
            )}
            <p
              className="mt-3 text-blue-500 text-sm font-medium cursor-pointer"
              onClick={() => {
                setToggleForm((el) => !el);
              }}
            >
              Change Password
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                toggleDropdown();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toggleDropdown();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
