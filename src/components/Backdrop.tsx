import React, { type ReactNode } from "react";

interface props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Backdrop = ({ isOpen, onClose, children }: props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      {/* <div className="relative z-50 rounded-lg p-6 w-full max-w-lg sm:max-w-xl lg:max-w-2xl"> */}
      <div className="relative z-50 w-auto max-w-md rounded-lg p-6 sm:max-w-lg lg:max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
