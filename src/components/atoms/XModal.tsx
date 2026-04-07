import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import "./XModal.css";

interface XModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function XModal({ isOpen, onClose, children }: XModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="xmodal__overlay" />
        <Dialog.Content
          className="xmodal__content"
          aria-describedby={undefined}
        >
          <Dialog.Title />
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
