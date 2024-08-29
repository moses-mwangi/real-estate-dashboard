import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  // setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-[1px] bg-black bg-opacity-50">
      <div>{children}</div>
    </div>
  );
}
