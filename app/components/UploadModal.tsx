import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ onClose, title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] bg-black bg-opacity-70">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
