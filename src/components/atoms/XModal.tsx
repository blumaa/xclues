import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import "./XModal.css";

interface XModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog (required by Radix for screen readers). */
  title: string;
  children: ReactNode;
}

export function XModal({ isOpen, onClose, title, children }: XModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="xmodal__overlay" />
        <Dialog.Content
          className="xmodal__content"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
