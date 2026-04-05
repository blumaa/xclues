import { useState, FormEvent } from "react";
import { Drawer, DrawerHeader, DrawerBody } from "@mond-design-system/theme/client";
import { Box, Button, Text, Heading } from "@mond-design-system/theme";
import { useAuth } from "../../providers/useAuth";
import { DeleteAccountConfirm } from "./DeleteAccountConfirm";
import "./AccountDrawer.css";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountDrawer({ isOpen, onClose }: AccountDrawerProps) {
  const { user, signOut, updateEmail, updatePassword } = useAuth();

  // Change email
  const [newEmail, setNewEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  // Change password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Delete
  const [showDelete, setShowDelete] = useState(false);

  async function handleUpdateEmail(e: FormEvent) {
    e.preventDefault();
    setEmailMsg(null);
    setEmailError(null);
    setIsUpdatingEmail(true);
    try {
      const { error } = await updateEmail(newEmail);
      if (error) {
        setEmailError(error.message);
      } else {
        setEmailMsg("Check your new email inbox to confirm the change.");
        setNewEmail("");
      }
    } finally {
      setIsUpdatingEmail(false);
    }
  }

  async function handleUpdatePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setPasswordError(error.message);
      } else {
        setPasswordMsg("Password updated successfully.");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    onClose();
  }

  function handleDeleted() {
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="lg">
      <DrawerHeader onClose={onClose}>
        <Heading level={3}>Account</Heading>
      </DrawerHeader>
      <DrawerBody>
        <Box padding="4" display="flex" flexDirection="column" gap="lg">

          {/* Profile */}
          <section className="account-section">
            <Heading level={4} size="sm">Profile</Heading>
            <Text size="sm" semantic="secondary">{user?.email}</Text>
          </section>

          <div className="account-divider" />

          {/* Change Email */}
          <section className="account-section">
            <Heading level={4} size="sm">Change Email</Heading>
            <form className="account-form" onSubmit={handleUpdateEmail}>
              <div className="account-field">
                <label className="account-label" htmlFor="account-new-email">New Email</label>
                <input
                  id="account-new-email"
                  className="account-input"
                  type="email"
                  autoComplete="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={isUpdatingEmail}
                />
              </div>
              {emailError && (
                <div className="account-error" role="alert">
                  <Text size="sm">{emailError}</Text>
                </div>
              )}
              {emailMsg && (
                <div className="account-success" role="status">
                  <Text size="sm">{emailMsg}</Text>
                </div>
              )}
              <Button type="submit" variant="outline" size="sm" disabled={isUpdatingEmail}>
                {isUpdatingEmail ? "Updating…" : "Update Email"}
              </Button>
            </form>
          </section>

          <div className="account-divider" />

          {/* Change Password */}
          <section className="account-section">
            <Heading level={4} size="sm">Change Password</Heading>
            <form className="account-form" onSubmit={handleUpdatePassword}>
              <div className="account-field">
                <label className="account-label" htmlFor="account-new-password">New Password</label>
                <input
                  id="account-new-password"
                  className="account-input"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                />
              </div>
              <div className="account-field">
                <label className="account-label" htmlFor="account-confirm-password">Confirm Password</label>
                <input
                  id="account-confirm-password"
                  className="account-input"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                />
              </div>
              {passwordError && (
                <div className="account-error" role="alert">
                  <Text size="sm">{passwordError}</Text>
                </div>
              )}
              {passwordMsg && (
                <div className="account-success" role="status">
                  <Text size="sm">{passwordMsg}</Text>
                </div>
              )}
              <Button type="submit" variant="outline" size="sm" disabled={isUpdatingPassword}>
                {isUpdatingPassword ? "Updating…" : "Update Password"}
              </Button>
            </form>
          </section>

          <div className="account-divider" />

          {/* Sign Out */}
          <section className="account-section">
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </section>

          <div className="account-divider" />

          {/* Danger Zone */}
          <section className="account-section">
            <Heading level={4} size="sm">Danger Zone</Heading>
            {showDelete ? (
              <DeleteAccountConfirm
                onCancel={() => setShowDelete(false)}
                onDeleted={handleDeleted}
              />
            ) : (
              <Box display="flex" flexDirection="column" gap="sm">
                <Text size="sm" semantic="secondary">
                  Permanently delete your account and all associated data.
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDelete(true)}
                >
                  Delete Account
                </Button>
              </Box>
            )}
          </section>

        </Box>
      </DrawerBody>
    </Drawer>
  );
}
