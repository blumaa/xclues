import type { Meta, StoryObj } from "@storybook/react-vite";
import { XButton } from "./components/ui";
import { Dot } from "./components/Dot";
import "./index.css";

function TokenSwatch({ name, token, items }: { name: string; token: string; items: { label: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: 8 }}>{token}</div>
      <div style={{ display: "flex", gap: 4, borderRadius: 8, overflow: "hidden" }}>
        {items.map((item) => (
          <div key={item.label} style={{ flex: 1, minWidth: 80 }}>
            <div style={{ height: 48, background: item.value, border: "1px solid rgba(128,128,128,0.2)" }} />
            <div style={{ fontSize: "0.65rem", padding: "4px 0", textAlign: "center" }}>
              <div>{item.label}</div>
              <div style={{ opacity: 0.5 }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignTokensPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>xClues Design Tokens</h1>
      <p>Toggle the 🎨 Brand toolbar and light/dark theme above to see tokens change live.</p>

      <h2>Brand Colors</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        <TokenSwatch name="Primary" token="--xclues-primary" items={[
          { label: "primary", value: "var(--xclues-primary)" },
          { label: "light", value: "var(--xclues-primary-light)" },
          { label: "dark", value: "var(--xclues-primary-dark)" },
        ]} />
        <TokenSwatch name="Accent" token="--xclues-accent" items={[
          { label: "accent", value: "var(--xclues-accent)" },
          { label: "light", value: "var(--xclues-accent-light)" },
          { label: "dark", value: "var(--xclues-accent-dark)" },
        ]} />
      </div>

      <h2>Game Group Colors</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { name: "Yellow (Easy)", token: "--xclues-yellow" },
          { name: "Green (Medium)", token: "--xclues-green" },
          { name: "Blue (Hard)", token: "--xclues-blue" },
          { name: "Purple (Expert)", token: "--xclues-purple" },
        ].map(({ name, token }) => (
          <TokenSwatch key={token} name={name} token={token} items={[{ label: name.split(" ")[0].toLowerCase(), value: `var(${token})` }]} />
        ))}
      </div>

      <h2>Surfaces</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { name: "Card Background", token: "--xclues-card-bg" },
          { name: "Card Hover", token: "--xclues-card-bg-hover" },
          { name: "Header", token: "--xclues-header-bg" },
          { name: "Footer", token: "--xclues-footer-bg" },
        ].map(({ name, token }) => (
          <TokenSwatch key={token} name={name} token={token} items={[{ label: name.toLowerCase(), value: `var(${token})` }]} />
        ))}
      </div>

      <h2>Primary Opacity Variants</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {["6", "8", "10", "15", "20"].map((n) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 60, height: 60, background: `var(--xclues-primary-${n})`, borderRadius: 8, border: "1px solid rgba(128,128,128,0.2)" }} />
            <div style={{ fontSize: "0.7rem", marginTop: 4 }}>{n}%</div>
          </div>
        ))}
      </div>

      <h2>Shadows</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
        {[
          ["shadow-sm", "var(--xclues-shadow-sm)"],
          ["shadow-md", "var(--xclues-shadow-md)"],
          ["shadow-lg", "var(--xclues-shadow-lg)"],
          ["primary-sm", "var(--xclues-shadow-primary-sm)"],
          ["primary-glow", "var(--xclues-shadow-primary-glow)"],
        ].map(([name, token]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 100, height: 100, background: "var(--xclues-card-bg)", borderRadius: "var(--xclues-border-radius)", boxShadow: token }} />
            <code style={{ fontSize: "0.65rem" }}>{name}</code>
          </div>
        ))}
      </div>

      <h2>Border Radius</h2>
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        {[
          ["xs", "var(--xclues-border-radius-xs)", "8px"],
          ["sm", "var(--xclues-border-radius-sm)", "12px"],
          ["default", "var(--xclues-border-radius)", "16px"],
        ].map(([name, token, value]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 80, height: 80, background: "var(--xclues-primary-15)", border: "2px solid var(--xclues-primary)", borderRadius: token }} />
            <code style={{ fontSize: "0.7rem" }}>{name}</code>
            <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>{value}</span>
          </div>
        ))}
      </div>

      <h2>Spacing</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[
          ["spacing-1", "0.25rem", "4px"],
          ["spacing-2", "0.5rem", "8px"],
          ["spacing-3", "0.75rem", "12px"],
          ["spacing-4", "1rem", "16px"],
          ["spacing-6", "1.5rem", "24px"],
          ["spacing-8", "2rem", "32px"],
        ].map(([name, value, px]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <code style={{ width: 100, fontSize: "0.75rem" }}>{name}</code>
            <div style={{ width: value, height: 24, background: "var(--xclues-primary)", borderRadius: 4 }} />
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{value} ({px})</span>
          </div>
        ))}
      </div>

      <h2>Buttons</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <XButton variant="primary">Primary</XButton>
        <XButton variant="outline">Outline</XButton>
        <XButton variant="ghost">Ghost</XButton>
      </div>

      <h2>Dot Indicators</h2>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <Dot key={i} size="lg" variant={i < 2 ? "filled" : "empty"} />
          ))}
        </div>
        <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>2 mistakes remaining</span>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {(["yellow", "green", "blue", "purple"] as const).map((color) => (
          <div key={color} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}>
            <Dot variant="color" color={color} />
            {color}
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design System/Tokens",
  component: DesignTokensPage,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const AllTokens: Story = {};
