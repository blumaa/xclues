"use client";

import { HowToPlayModal } from "../../src/components/organisms/HowToPlayModal";
import { useState } from "react";
import "../simple-page.css";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="simple-page">
      <h1>How to Play</h1>
      <HowToPlayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
