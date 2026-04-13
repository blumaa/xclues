import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

function ToastTrigger({
  type,
  title,
  message,
  delay = 300,
}: {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  delay?: number;
}) {
  const toast = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      toast[`show${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof toast](
        title,
        message
      );
    }, delay);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function InteractiveDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  return (
    <div className="game-controls">
      <button className="xbutton xbutton--primary" onClick={() => showSuccess("Group found!", "You matched all 4 items")}>
        Success
      </button>
      <button className="xbutton xbutton--outline" onClick={() => showError("Not quite!", "Those items don't form a group")}>
        Error
      </button>
      <button className="xbutton xbutton--outline" onClick={() => showWarning("One away!", "You were so close to the answer")}>
        Warning
      </button>
      <button className="xbutton xbutton--outline" onClick={() => showInfo("Hint", "Try looking for a movie theme")}>
        Info
      </button>
    </div>
  );
}

const meta: Meta<typeof ToastProvider> = {
  title: "UI/Toast",
  component: ToastProvider,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Success: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" />
    </ToastProvider>
  ),
};

export const Error: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="error" title="Not quite!" message="Those items don't form a group" />
    </ToastProvider>
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="warning" title="One away!" message="You were so close to the answer" />
    </ToastProvider>
  ),
};

export const Info: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="info" title="Hint" message="Try looking for a movie theme" />
    </ToastProvider>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" delay={300} />
      <ToastTrigger type="error" title="Not quite!" message="Those items don't form a group" delay={600} />
      <ToastTrigger type="warning" title="One away!" message="You were so close to the answer" delay={900} />
      <ToastTrigger type="info" title="Hint" message="Try looking for a movie theme" delay={1200} />
    </ToastProvider>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Copied to clipboard!" />
      <ToastTrigger type="info" title="Already guessed" delay={500} />
    </ToastProvider>
  ),
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <InteractiveDemo />
    </ToastProvider>
  ),
};

export const SuccessMobile: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" />
    </ToastProvider>
  ),
  parameters: { viewport: { defaultViewport: "mobile" } },
};

export const AllTypesMobile: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" delay={300} />
      <ToastTrigger type="error" title="Not quite!" message="Those items don't form a group" delay={600} />
      <ToastTrigger type="warning" title="One away!" message="You were so close to the answer" delay={900} />
      <ToastTrigger type="info" title="Hint" message="Try looking for a movie theme" delay={1200} />
    </ToastProvider>
  ),
  parameters: { viewport: { defaultViewport: "mobile" } },
};

export const AllTypesTablet: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" delay={300} />
      <ToastTrigger type="error" title="Not quite!" message="Those items don't form a group" delay={600} />
      <ToastTrigger type="warning" title="One away!" message="You were so close to the answer" delay={900} />
      <ToastTrigger type="info" title="Hint" message="Try looking for a movie theme" delay={1200} />
    </ToastProvider>
  ),
  parameters: { viewport: { defaultViewport: "tablet" } },
};

export const AllTypesDesktop: Story = {
  render: () => (
    <ToastProvider>
      <ToastTrigger type="success" title="Group found!" message="You matched all 4 items" delay={300} />
      <ToastTrigger type="error" title="Not quite!" message="Those items don't form a group" delay={600} />
      <ToastTrigger type="warning" title="One away!" message="You were so close to the answer" delay={900} />
      <ToastTrigger type="info" title="Hint" message="Try looking for a movie theme" delay={1200} />
    </ToastProvider>
  ),
  parameters: { viewport: { defaultViewport: "desktop" } },
};
