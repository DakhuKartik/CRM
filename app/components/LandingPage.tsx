"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, BarChart3, Calendar, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

export function LandingPage() {
  const router = useRouter();
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/waitlist/count", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && typeof data?.count === "number") setWaitlistCount(data.count);
      } catch {
        // ignore, keep null
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3" aria-label="Blueticked home">
            <Image src="/logo.png" alt="Blueticked" width={34} height={34} priority />
            <span className="text-xl font-semibold text-gray-900">BlueTicked</span>
          </a>

          <button
            onClick={() => router.push("/waitlist")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            WhatsApp-first CRM for small teams
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Shared inbox, assignments, customer notes, and follow-ups — built for businesses with fewer than 10 people.
          </p>

          <button
            onClick={() => router.push("/waitlist")}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-flex items-center gap-2"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            {waitlistCount === null ? (
              <>Join businesses on our waitlist</>
            ) : (
              <>Join {waitlistCount.toLocaleString()}+ businesses on our waitlist</>
            )}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything your team needs
            </h2>
            <p className="text-lg text-gray-600">
              No bloat. Just the essentials for running sales/support on WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={<Users className="w-6 h-6 text-blue-600" />}
              color="bg-blue-100"
              title="Shared Inbox"
              desc="One number, multiple agents, full visibility."
            />
            <Feature
              icon={<BarChart3 className="w-6 h-6 text-green-600" />}
              color="bg-green-100"
              title="Leads + Pipeline"
              desc="Track leads from first message to close."
            />
            <Feature
              icon={<Calendar className="w-6 h-6 text-purple-600" />}
              color="bg-purple-100"
              title="Follow-ups"
              desc="Reminders so no lead gets forgotten."
            />
            <Feature
              icon={<MessageSquare className="w-6 h-6 text-orange-600" />}
              color="bg-orange-100"
              title="Notes + Context"
              desc="Customer notes your whole team can see."
            />
          </div>
        </div>
      </section>

      {/* Benefits + Waitlist Count Card (replaces revenue/sales block) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why small businesses choose BlueTicked
              </h2>

              <div className="space-y-4">
                <Benefit
                  title="Built for teams under 10"
                  desc="Designed for small crews — not enterprise complexity."
                />
                <Benefit
                  title="WhatsApp integration-first"
                  desc="CRM workflow starts where your customers already are."
                />
                <Benefit
                  title="Fast onboarding"
                  desc="Set up quickly and start replying as a team in minutes."
                />
                <Benefit
                  title="Real support"
                  desc="Humans who help you get value quickly."
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-sm text-gray-600 mb-2">Businesses on the waitlist</div>

                <div className="text-4xl font-bold text-gray-900">
                  {waitlistCount === null ? "—" : waitlistCount.toLocaleString()}
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  {waitlistCount === null ? "Loading live count…" : "Live count from the database"}
                </div>

                <button
                  onClick={() => router.push("/waitlist")}
                  className="mt-6 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                >
                  Join Waitlist
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="text-xs text-gray-400 mt-3">
                  We’ll email you when early access opens.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to manage WhatsApp leads like a pro?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the waitlist and get early access to BlueTicked.
          </p>
          <button
            onClick={() => router.push("/waitlist")}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold inline-flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}

function Feature({
  icon,
  color,
  title,
  desc,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Benefit({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
