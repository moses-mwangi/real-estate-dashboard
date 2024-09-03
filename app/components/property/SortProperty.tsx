// "use client";

// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ListFilter } from "lucide-react";
// import { Card } from "@/components/ui/card";

// const sorts = [{ label: "price" }, { label: "createdAt" }, { label: "type" }];

// export default function SortProperty() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <div
//         className="hover:bg-slate-300 relative transition-all duration-150 cursor-pointer rounded-md w-9 h-9 flex items-center justify-center"
//         onClick={() => {
//           setIsOpen((el) => !el);
//         }}
//       >
//         <ListFilter className="w-7 h-7" />
//         {isOpen === true && (
//           <Card className=" absolute top-14 p-2 rounded-sm">
//             {sorts.map((el) => (
//               <div
//                 className="flex"
//                 key={el.label}
//                 onClick={() => {
//                   const params = new URLSearchParams(searchParams);
//                   params.set("SortBy", el.label);
//                   router.push("?" + params.toString());
//                   router.refresh();
//                 }}
//               >
//                 SortBy {el.label}
//               </div>
//             ))}
//           </Card>
//         )}
//       </div>
//     </div>
//     // <DropdownMenu>
//     //   <DropdownMenuTrigger className="bg-inherit border-none max-w-none">
//     //     <ListFilter className="w-7 h-7" />
//     //   </DropdownMenuTrigger>
//     //   <DropdownMenuContent>
//     //     <DropdownMenuGroup>
//     //       {sorts.map((el) => (
//     //         <DropdownMenuItem
//     // key={el.label}
//     // onClick={() => {
//     //   const params = new URLSearchParams(searchParams);
//     //   params.set("SortBy", el.label);
//     //   router.push("?" + params.toString());
//     //   router.refresh();
//     // }}
//     //         >
//     //           SortBy ( {el.label} )
//     //         </DropdownMenuItem>
//     //       ))}
//     //     </DropdownMenuGroup>
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";
import { Card } from "@/components/ui/card";

const sorts = [{ label: "price" }, { label: "createdAt" }, { label: "type" }];

export default function SortProperty() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortSelection = (sortLabel: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("SortBy", sortLabel);
    router.push("?" + params.toString());
    router.refresh();
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="relative">
      <div
        className="hover:bg-slate-300 transition-all duration-150 cursor-pointer rounded-md w-9 h-9 flex items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ListFilter className="w-7 h-7" />
      </div>
      {isOpen && (
        <Card className="absolute w-40 top-14 -right-16 py-2 px-2 shadow-lg rounded-md">
          {sorts.map((el) => (
            <div
              key={el.label}
              className="cursor-pointer text-[14px] text-gray-700 font-medium p-2 flex hover:bg-slate-200 rounded-md"
              onClick={() => handleSortSelection(el.label)}
            >
              SortBy {el.label}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
