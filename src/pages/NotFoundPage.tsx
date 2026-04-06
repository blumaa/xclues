import { useNavigate } from "react-router-dom";
import { XText, XButton } from "../components/ui";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--xclues-spacing-md, 1rem)', padding: 'var(--xclues-spacing-8, 2rem)' }}>
      <XText size="xl" weight="bold">
        Page not found
      </XText>
      <XButton variant="primary" onClick={() => navigate("/")}>
        Back to today's puzzle
      </XButton>
    </div>
  );
}
