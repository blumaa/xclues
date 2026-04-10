"use client";

import { useState } from "react";
import { XButton, XInput, XText, XHeading } from "../../src/components/atoms";
import { useAuth } from "../../src/providers/useAuth";
import "../simple-page.css";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await updatePassword(password);
      setSuccess(true);
    } catch {
      setError("Failed to update password. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="simple-page--narrow">
        <XHeading level={1}>Password Updated</XHeading>
        <XText>Your password has been successfully updated.</XText>
      </div>
    );
  }

  return (
    <div className="simple-page--narrow">
      <XHeading level={1}>Reset Password</XHeading>
      <form onSubmit={handleSubmit} className="simple-page-form">
        <XInput
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <XInput
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <XText semantic="secondary">{error}</XText>}
        <XButton type="submit" variant="primary">
          Update Password
        </XButton>
      </form>
    </div>
  );
}
