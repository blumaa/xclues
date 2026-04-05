import { useState, FormEvent } from "react";
import { Box, Button, Text, Heading } from "@mond-design-system/theme";
import { useAuth } from "../../providers/useAuth";
import "./DeleteAccountConfirm.css";

interface DeleteAccountConfirmProps {
  onCancel: () => void;
  onDeleted: () => void;
}

export function DeleteAccountConfirm({ onCancel, onDeleted }: DeleteAccountConfirmProps) {
  const { deleteAccount } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = confirmText === "DELETE";

  async function handleDelete(e: FormEvent) {
    e.preventDefault();
    if (!canDelete) return;

    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const { error } = await deleteAccount();
      if (error) {
        setErrorMsg(error.message);
      } else {
        onDeleted();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="delete-confirm">
      <div className="delete-confirm-warning">
        <Heading level={4} size="sm">
          Delete your account?
        </Heading>
        <Text size="sm" semantic="secondary">
          This permanently deletes your account and all game stats. This action cannot be undone.
        </Text>
      </div>

      <form className="delete-confirm-form" onSubmit={handleDelete}>
        <label className="delete-confirm-label" htmlFor="delete-confirm-input">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          id="delete-confirm-input"
          className="delete-confirm-input"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          disabled={isDeleting}
          autoComplete="off"
          spellCheck={false}
        />

        {errorMsg && (
          <div className="delete-confirm-error" role="alert">
            <Text size="sm">{errorMsg}</Text>
          </div>
        )}

        <Box display="flex" gap="sm" paddingTop="2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!canDelete || isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete Account"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
