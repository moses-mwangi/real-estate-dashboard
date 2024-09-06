"use client";

import React, { useState } from "react";
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
import toast from "react-hot-toast";
import axios from "axios";

interface Id {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteProperty({ id, setIsOpen }: Id) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      toast.success("You have succesfully deleted property");

      return;
    }

    try {
      setIsLoading(true);

      await axios.delete(
        `https://real-estate-api-azure.vercel.app/api/property/${id}`
      );

      toast.success("You have succesfully deleted property");
      setIsOpen(false);
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR:", err);
      toast.error("Failed to delete property");
    }
  };

  return (
    <>
      <div className=" hidden sm:block">
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
                onClick={() => handleDelete()}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="sm:hidden">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex gap-[2px] items-center">
              <LuTrash2 className=" w-[17px] h-[17px] mr-2 text-slate-50" />
              <span className=" font-medium text-slate-50 text-sm">Delete</span>
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
    </>
  );
}
