'use client';

import { useRouter } from 'next/navigation';
import {
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">BlueTicked</span>
          </div>
          <button
            onClick={() => router.push('/waitlist')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">The CRM Built for Small Teams</h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your customer relationships effortlessly with a CRM designed specifically for teams of 5-10
            employees. Simple, powerful, and affordable.
          </p>
          <button
            onClick={() => router.push('/waitlist')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-flex items-center gap-2"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 mt-4">Join 500+ businesses on our waitlist</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything Your Small Team Needs</h2>
            <p className="text-lg text-gray-600">No complexity, no bloat. Just the features that matter.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Management</h3>
              <p className="text-gray-600">Keep all your customer information organized in one place</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Pipeline</h3>
              <p className="text-gray-600">Track deals and opportunities from lead to close</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Tracking</h3>
              <p className="text-gray-600">Never miss a follow-up with automated reminders</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Work together seamlessly with your entire team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Small Businesses Choose BlueTicked</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Built for Your Size</h3>
                    <p className="text-gray-600">
                      Designed specifically for teams of 5-10, not oversized enterprise solutions
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Affordable Pricing</h3>
                    <p className="text-gray-600">Simple, transparent pricing that won't break the bank</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy to Use</h3>
                    <p className="text-gray-600">Get started in minutes, not weeks. No training required</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personal Support</h3>
                    <p className="text-gray-600">Real humans ready to help, not automated chatbots</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="text-2xl font-bold text-gray-900">$45,230</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow p-4">
                  <div className="text-sm text-gray-600 mb-1">Active Deals</div>
                  <div className="text-2xl font-bold text-gray-900">24</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                  <div className="text-sm text-gray-600 mb-1">Customers</div>
                  <div className="text-2xl font-bold text-gray-900">156</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Customer Relationships?</h2>
          <p className="text-xl text-blue-100 mb-8">Join our waitlist and be among the first to experience BlueTicked</p>
          <button
            onClick={() => router.push('/waitlist')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold inline-flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">BlueTicked</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 BlueTicked. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
