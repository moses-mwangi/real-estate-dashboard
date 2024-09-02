"use client";

import {
  HomeIcon,
  House,
  HouseIcon,
  LucideHouse,
  LucideUsers2,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LiaStoreSolid } from "react-icons/lia";
import { LuExternalLink } from "react-icons/lu";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Modal from "../Modal";
import UpdateCurrentUser from "../user/UpdateCurrentUser";
import UpdateCurrentUserPassword from "../user/UpdateCurrentUserPassword";

const links = [
  {
    label: "Website",
    icon: <LuExternalLink className="w-[22px] h-[22px]" />,
    ref: "https://real-estate-mu-peach.vercel.app/",
  },
  {
    label: "Dashboard",
    icon: <HomeIcon className="w-[22px] h-[22px]" />,
    ref: "/dashboard",
  },
  {
    label: "Add Property",
    icon: <LucideHouse className="w-[22px] h-[22px]" />,
    ref: "/addProperty",
  },
  {
    label: "Add Agents",
    icon: <LucideUsers2 className="w-[22px] h-[22px]" />,
    ref: "/addAgent",
  },
  // {
  //   label: "Setting",
  //   icon: <Settings className="w-[22px] h-[22px]" />,
  //   ref: "/setting",
  // },
];

export default function SideBarActivity() {
  const path = usePathname();

  const [toggleForm, setToggleForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-3 pt-8 flex flex-col gap-2">
      {links.map((el) => (
        <Link
          key={el.label}
          href={el.ref}
          className={`${
            el.ref === path ? " bg-gray-200" : ""
          }   flex gap-2 items-center py-2 px-4 rounded-sm hover:bg-gray-200 transition-all duration-150`}
        >
          <span
            className={`${
              el.ref === path ? " text-blue-700/90" : " text-gray-500"
            }  font-medium`}
          >
            {el.icon}
          </span>
          <span
            className={`${
              el.ref === path ? " text-blue-700/90" : " text-gray-700"
            } font-medium`}
          >
            {el.label}
          </span>
        </Link>
      ))}
      <div>
        <div
          className="pl-4 cursor-pointer hover:bg-gray-200 rounded-md py-2"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <span
            className={`flex gap-2 items-center  text-gray-700 hover:text-blue-700/90 font-medium`}
          >
            <Settings className="w-[22px] h-[22px]" /> Setting
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
    </div>
  );
}
