import type { Metadata } from "next";
import "../simple-page.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return (
    <div className="simple-page">
      <h1>Analytics</h1>
      <p>Coming soon.</p>
    </div>
  );
}
