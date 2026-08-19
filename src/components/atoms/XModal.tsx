import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import "./XModal.css";

interface XModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog (required by Radix for screen readers). */
  title: string;
  /**
   * When false the modal cannot be closed by Escape or by clicking outside;
   * only its own controls can close it. Used by the feedback survey, which
   * must be answered rather than dismissed.
   */
  dismissable?: boolean;
  children: ReactNode;
}

export function XModal({
  isOpen,
  onClose,
  title,
  dismissable = true,
  children,
}: XModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="xmodal__overlay" />
        <Dialog.Content
          className="xmodal__content"
          aria-describedby={undefined}
          onEscapeKeyDown={dismissable ? undefined : (e) => e.preventDefault()}
          onPointerDownOutside={
            dismissable ? undefined : (e) => e.preventDefault()
          }
          onInteractOutside={dismissable ? undefined : (e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
