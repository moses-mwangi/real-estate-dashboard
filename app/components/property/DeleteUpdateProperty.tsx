"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, PenBox } from "lucide-react";
import { LuMoreVertical } from "react-icons/lu";
import DeleteProperty from "./DeleteProperty";

interface Id {
  id: string;
}

export default function UserPropertyOperation({ id }: Id) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-inherit border-none max-w-none"
        onClick={toggleMenu}
      >
        <LuMoreVertical className="w-7 h-7 p-1" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-[6px] w-40 bg-white border border-gray-300 rounded shadow-lg">
          <div className="p-2">
            {/* <div
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/${id}`);
                closeMenu();
              }}
            >
              <EyeIcon className="w-[21px] h-[21px] mr-2 text-gray-500" />
              <span className="font-medium text-gray-700">View</span>
            </div> */}
            <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <DeleteProperty id={id} setIsOpen={setIsOpen} />
            </div>
            <div
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/${id}/updateProperty`);
                closeMenu();
              }}
            >
              <PenBox className="w-[21px] h-[21px] mr-2 text-gray-500" />
              <span className="font-medium text-gray-700">Update</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
