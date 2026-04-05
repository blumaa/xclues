import { useState } from "react";
import { Button } from "@mond-design-system/theme";
import { useAuth } from "../providers/useAuth";
import { AuthModal } from "./auth/AuthModal";
import { AccountDrawer } from "./auth/AccountDrawer";
import "./UserMenuButton.css";

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function UserMenuButton() {
  const { user, isLoading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  if (isLoading) return null;

  function handleClick() {
    if (user) {
      setShowAccount(true);
    } else {
      setShowAuth(true);
    }
  }

  const initial = user?.email?.[0]?.toUpperCase();

  return (
    <>
      <Button
        variant="ghost"
        size="md"
        iconOnly={!initial}
        onClick={handleClick}
        aria-label={user ? "Account settings" : "Log in or sign up"}
      >
        {initial ? (
          <span className="user-menu-initial">{initial}</span>
        ) : (
          <UserIcon />
        )}
      </Button>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <AccountDrawer isOpen={showAccount} onClose={() => setShowAccount(false)} />
    </>
  );
}
