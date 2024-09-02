import React from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full h-full md:h-auto relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100vh-150px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
