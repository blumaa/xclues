"use client";

import { HowToPlayModal } from "../../src/components/organisms/HowToPlayModal";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>How to Play</h1>
      <HowToPlayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
