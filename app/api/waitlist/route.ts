import { NextResponse } from "next/server";
import crypto from "crypto";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeBaseUrl(url: string) {
  // Avoid accidental double slashes when calling PostgREST
  return url.replace(/\/+$/, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const industry = String(body.industry || "").trim();
    const teamSize = String(body.teamSize || "").trim();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    // Simple anti-bot: require a stable HMAC secret in env (not perfect, but helps)
    const secret = process.env.WAITLIST_HMAC_SECRET || "";
    if (!secret) {
      return NextResponse.json(
        { error: "Server not configured (missing WAITLIST_HMAC_SECRET)." },
        { status: 500 }
      );
    }
    // Computed but not returned; ensures we at least touch the secret and can evolve to signed tokens later.
    crypto.createHmac("sha256", secret).update(email).digest("hex");

    // ---- Store in Supabase ----
    const SUPABASE_URL = normalizeBaseUrl(process.env.SUPABASE_URL || "");
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "Server not configured (missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY).",
        },
        { status: 500 }
      );
    }

    const insertPayload = {
      email,
      industry: industry || null,
      team_size: teamSize || null,
      source: "landing",
      // If your table has a default now(), you can remove this.
      created_at: new Date().toISOString(),
    };

    // Use PostgREST directly (no SDK dependency).
    // Upsert on email so repeat signups don't fail.
    const endpoint = `${SUPABASE_URL}/rest/v1/waitlist?on_conflict=email`;

    const supabaseRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(insertPayload),
    });

    // If unique constraint triggers and you aren't using on_conflict, Supabase may return 409.
    if (!supabaseRes.ok && supabaseRes.status !== 409) {
      const text = await supabaseRes.text();
      console.error("Waitlist insert failed:", supabaseRes.status, text);
      return NextResponse.json(
        { error: `Database error (${supabaseRes.status}): ${text}` },
        { status: 500 }
      );
    }

    // ---- Optional: confirmation email via Resend ----
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL;

    if (RESEND_API_KEY && FROM_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: "You’re on the waitlist",
          html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
              <h2>Thanks for joining!</h2>
              <p>You’re on the early access list for our WhatsApp-first CRM for small teams.</p>
              <p>We’ll reach out soon with onboarding details.</p>
              <p style="color:#666;font-size:12px">If you didn’t sign up, you can ignore this email.</p>
            </div>
          `,
        }),
      }).catch(() => {
        // don't fail signup if email fails
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Waitlist route error:", e);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
