"use client";

import React, { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";

interface DeletePropertyProps {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteProperty({
  id,
  setIsOpen,
  isModalOpen,
  setModalOpen,
}: DeletePropertyProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      toast.error("No property ID provided.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.delete(
        `https://real-estate-api-azure.vercel.app/api/property/${id}`
      );

      console.log(res.data);

      toast.success("You have successfully deleted the property.");
      setIsOpen(false);
      setModalOpen(false);
    } catch (err) {
      console.error("ERROR:", err);
      toast.error("Failed to delete property.");
    } finally {
      setIsLoading(false);
    }
  };

  const loader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <>
      <button
        className="flex gap-2 items-center text-gray-700 font-medium hover:text-red-600"
        onClick={() => setModalOpen(true)}
      >
        <LuTrash2 className="w-5 h-5 text-red-600" />
        Delete
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900">
              Are you absolutely sure?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone. This will permanently delete your
              property and remove your data from our servers.
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? loader : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
