import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import "./XDrawer.css";

interface XDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function XDrawer({ isOpen, onClose, width = "md", children }: XDrawerProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="xdrawer__overlay" />
        <Dialog.Content className={`xdrawer__content xdrawer--${width}`} aria-describedby={undefined}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface XDrawerHeaderProps {
  onClose?: () => void;
  children: ReactNode;
}

export function XDrawerHeader({ onClose, children }: XDrawerHeaderProps) {
  return (
    <div className="xdrawer__header">
      <div className="xdrawer__header-content">{children}</div>
      {onClose && (
        <button className="xdrawer__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      )}
    </div>
  );
}

export function XDrawerBody({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`xdrawer__body ${className}`} {...rest}>
      {children}
    </div>
  );
}
