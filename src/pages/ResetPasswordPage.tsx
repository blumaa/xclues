import { useState } from "react";
import { supabase } from "../lib/supabase/client";
import { useNavigate } from "react-router-dom";
import { XText, XButton, XHeading, XInput } from "../components/ui";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--xclues-spacing-md, 1rem)', padding: 'var(--xclues-spacing-8, 2rem)' }}>
      <XHeading level={2} responsive>
        Reset Password
      </XHeading>

      {status === "sent" ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--xclues-spacing-sm, 0.5rem)' }}>
          <XText align="center">
            Check your email for a password reset link.
          </XText>
          <XButton variant="primary" onClick={() => navigate("/")}>
            Back to game
          </XButton>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 360 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--xclues-spacing-sm, 0.5rem)' }}>
              <label htmlFor="reset-email">
                <XText size="sm" weight="bold">Email</XText>
              </label>
              <XInput
                id="reset-email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              {status === "error" && (
                <div role="alert">
                  <XText size="sm" style={{ color: 'var(--xclues-color-error, red)' }}>
                    {errorMsg}
                  </XText>
                </div>
              )}
              <XButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Reset Link"}
              </XButton>
            </div>
          </form>
        </div>
      )}

      <XButton variant="primary" onClick={() => navigate("/")}>
        Back to game
      </XButton>
    </div>
  );
}
