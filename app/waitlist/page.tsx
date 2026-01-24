"use client";

import { useState } from "react";
import Image from "next/image";


type FormState = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("Home Services");
  const [teamSize, setTeamSize] = useState("1-5");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, industry, teamSize }),
      });

      // API always returns JSON in our corrected server route below,
      // but guard anyway to avoid runtime errors.
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

      setState("success");
      setMessage("You're on the list — we’ll email you when early access opens.");
      setEmail("");
    } catch (err: any) {
      setState("error");
      setMessage(err?.message || "Failed to join waitlist.");
    }
  }

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "48px 20px",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
        <div style={{ fontWeight: 700 }}>BlueTicked</div>
        <a href="#waitlist" style={{ textDecoration: "none" }}>
          Join waitlist →
        </a>
      </header>

      <section style={{ display: "grid", gap: 18, marginBottom: 36 }}>
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>Stop losing leads in WhatsApp.</h1>
        <p style={{ fontSize: 18, color: "#444", margin: 0, maxWidth: 720 }}>
          A lightweight WhatsApp-first CRM for small teams: shared inbox, customer notes, and follow-up reminders —
          without the complexity of traditional CRMs.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <Pill>Shared team inbox</Pill>
          <Pill>Assign chats</Pill>
          <Pill>Follow-up reminders</Pill>
          <Pill>Search + notes</Pill>
        </div>
      </section>

      <section id="waitlist" style={{ border: "1px solid #eee", borderRadius: 14, padding: 18, marginBottom: 28 }}>
        <h2 style={{ margin: "0 0 10px 0" }}>Get early access (US launch)</h2>
        <p style={{ margin: "0 0 16px 0", color: "#555" }}>
          We’re inviting the first 25 businesses. Early users get discounted pricing + onboarding.
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={inputStyle}>
              <option>Home Services</option>
              <option>Real Estate</option>
              <option>Clinic / Dental</option>
              <option>Beauty / Salon</option>
              <option>E-commerce</option>
              <option>Education / Coaching</option>
              <option>Other</option>
            </select>

            <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} style={inputStyle}>
              <option>1-5</option>
              <option>6-10</option>
              <option>11-25</option>
              <option>26+</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={state === "loading"}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontWeight: 600,
              cursor: state === "loading" ? "not-allowed" : "pointer",
            }}
          >
            {state === "loading" ? "Joining..." : "Join the waitlist"}
          </button>

          {message && <div style={{ color: state === "error" ? "#b00020" : "#1b5e20", fontSize: 14 }}>{message}</div>}

          <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
            By joining, you agree to be contacted about early access. No spam.
          </div>
        </form>
      </section>

      <footer style={{ marginTop: 40, color: "#666", fontSize: 13 }}>
        © {new Date().getFullYear()} WAI • Contact:{" "}
        <a href="mailto:founders@yourdomain.com">founders@yourdomain.com</a>
      </footer>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ border: "1px solid #eee", borderRadius: 999, padding: "6px 10px", fontSize: 13, color: "#333" }}>
      {children}
    </span>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 14,
  outline: "none",
};
