import { useState, FormEvent } from "react";
import { Modal } from "@mond-design-system/theme/client";
import { Box, Button, Text, Heading } from "@mond-design-system/theme";
import { useAuth } from "../../providers/useAuth";
import "./AuthModal.css";

type Mode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  function switchMode(next: Mode) {
    setMode(next);
    resetForm();
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === "signup" && password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          handleClose();
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("Account created! Check your email to confirm, then log in.");
          setMode("login");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="auth-modal-content">
        <Heading level={2} size="lg">
          {mode === "login" ? "Log In" : "Create Account"}
        </Heading>

        {/* Mode tabs */}
        <div className="auth-modal-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={mode === "login"}
            className={`auth-modal-tab${mode === "login" ? " auth-modal-tab--active" : ""}`}
            onClick={() => switchMode("login")}
            type="button"
          >
            Log In
          </button>
          <button
            role="tab"
            aria-selected={mode === "signup"}
            className={`auth-modal-tab${mode === "signup" ? " auth-modal-tab--active" : ""}`}
            onClick={() => switchMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {successMsg && (
          <div className="auth-modal-success" role="status">
            <Text size="sm">{successMsg}</Text>
          </div>
        )}

        <form className="auth-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-modal-field">
            <label className="auth-modal-label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              className="auth-modal-input"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="auth-modal-field">
            <label className="auth-modal-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              className="auth-modal-input"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {mode === "signup" && (
            <div className="auth-modal-field">
              <label className="auth-modal-label" htmlFor="auth-confirm-password">
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                className="auth-modal-input"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {errorMsg && (
            <div className="auth-modal-error" role="alert">
              <Text size="sm">{errorMsg}</Text>
            </div>
          )}

          <Box paddingTop="2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "login" ? "Logging in…" : "Creating account…"
                : mode === "login" ? "Log In" : "Create Account"}
            </Button>
          </Box>
        </form>
      </div>
    </Modal>
  );
}
