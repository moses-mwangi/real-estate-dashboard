// "use client";

// import React from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";
// import { EyeIcon, PenBox } from "lucide-react";
// import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
// import DeleteProperty from "./DeleteProperty";

// interface Id {
//   id: string;
// }

// export default function UserPropertyOperation({ id }: Id) {
//   const router = useRouter();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="bg-inherit border-none max-w-none">
//         <LuMoreVertical className=" w-7 h-7 p-1" />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className=" w-40">
//         <DropdownMenuGroup>
//           <DropdownMenuItem
//             onClick={() => {
//               router.push(`/dashboard/${id}`);
//             }}
//           >
//             <EyeIcon className=" w-[21px] h-[21px] mr-2 text-gray-500" />
//             <span className=" font-medium text-gray-700">View</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => {}}>
//             <DeleteProperty id={id} />
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => {
//               router.push(`/dashboard/${id}/updateProperty`);
//             }}
//           >
//             <PenBox className=" w-[21px] h-[21px] mr-2 text-gray-500" />
//             <span className=" font-medium text-gray-700">Update</span>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, PenBox } from "lucide-react";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
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
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
          <div className="p-2">
            <div
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/${id}`);
                closeMenu();
              }}
            >
              <EyeIcon className="w-[21px] h-[21px] mr-2 text-gray-500" />
              <span className="font-medium text-gray-700">View</span>
            </div>
            <div
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                closeMenu();
              }}
            >
              <DeleteProperty id={id} />
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