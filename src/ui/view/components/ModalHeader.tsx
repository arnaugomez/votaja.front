import CloseIcon from "@icons/close";
import React from "react";
import { CProps } from "src/common/view/view-models/CProps";

interface Props extends CProps {
  onClose: () => void;
}

export default function ModalHeader({ children, onClose }: Props) {
  return (
    <div className="flex-none relative px-8">
      <h2 className="text-sm font-medium text-center">{children}</h2>
      <button
        className="absolute inset-y-0 my-auto right-0 flex items-center justify-center"
        aria-label="Close modal"
        onClick={onClose}
      >
        <div className="h-4 w-4">
          <CloseIcon />
        </div>
      </button>
    </div>
  );
}
