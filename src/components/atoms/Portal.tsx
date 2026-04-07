"use client";

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export function Portal({ children }: { children: React.ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // defer state update to next frame to avoid cascading renders
    requestAnimationFrame(() => {
      const el = document.getElementById('portal-root');
      if (el) setContainer(el);
    });
  }, []);

  return container ? createPortal(children, container) : null;
}
