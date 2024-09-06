"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PenBox } from "lucide-react";
import { LuMoreVertical } from "react-icons/lu";
import DeleteProperty from "./DeleteProperty";

interface Id {
  id: string;
}

export default function UserPropertyOperation({ id }: Id) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="hidden sm:block relative">
        <button
          className="bg-inherit hover:bg-gray-300 transition-all duration-150 rounded-sm w-8 h-8 flex items-center justify-center border-none max-w-none"
          onClick={toggleMenu}
        >
          <LuMoreVertical className="w-7 h-7 p-1" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-[6px] w-40 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-2">
              <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <DeleteProperty
                  id={id}
                  setIsOpen={setIsOpen}
                  isModalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                />
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

      <div className="sm:hidden">
        <div className="">
          <div className="px-2 mb-2 flex justify-between">
            <div className="flex items-center bg-orange-500 px-2 py-1 rounded-sm text-slate-50 cursor-pointer">
              <DeleteProperty
                id={id}
                setIsOpen={setIsOpen}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            </div>
            <div
              className="flex items-center gap-1 bg-orange-500 px-2 py-1 rounded-sm cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/${id}/updateProperty`);
                closeMenu();
              }}
            >
              <PenBox className="w-[17px] h-[17px] text-slate-50" />
              <p className="font-medium text-[14px] text-slate-50">Update</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
