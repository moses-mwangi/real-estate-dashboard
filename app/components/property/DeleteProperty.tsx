"use client";

import React from "react";

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
import { LuTrash2 } from "react-icons/lu";

interface Id {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteProperty({ id, setIsOpen }: Id) {
  const handleDelete = () => {
    console.log("Deleting property with id:", id);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex gap-[2px] items-center">
            <LuTrash2 className=" w-[21px] h-[21px] mr-2 text-red-600" />
            <span className=" font-medium text-gray-700">Delete</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              property and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className=" bg-red-600 hover:bg-red-700"
              onClick={() => {
                handleDelete();
                setIsOpen(false);
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
