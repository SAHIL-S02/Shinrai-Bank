import React from "react";

const Features = () => {
  const featureSections = [
    {
      title: "Authentication & Security",
      icon: "🔒",
      features: [
        "User Registration",
        "Email OTP Verification",
        "JWT Authentication",
        "Refresh Token Rotation",
        "Password Hashing",
        "Session Tracking",
        "Luhn Valid Debit Cards",
        "Secure HTTP-Only Cookies",
      ],
    },
    {
      title: "Banking Operations",
      icon: "💸",
      features: [
        "Money Transfer via Phone Number",
        "Money Transfer via Account Number",
        "Money Transfer via UPI",
        "Balance Check",
        "Daily Transfer Limits",
        "Monthly Transfer Limits",
        "Atomic Transactions",
        "Insufficient Balance Protection",
      ],
    },
    {
      title: "Dashboard",
      icon: "📊",
      features: [
        "Account Overview",
        "Debit Card Display",
        "UPI QR Code",
        "Recent Transactions",
        "Quick Transfer Shortcuts",
        "Promotional Offers",
      ],
    },
    {
      title: "Loans & Credit",
      icon: "🏦",
      features: [
        "Personal Loans",
        "Home Loans",
        "Vehicle Loans",
        "EMI Calculator",
        "Pre-approved Loan Offers",
      ],
    },
    {
      title: "Account Management",
      icon: "👤",
      features: [
        "Multiple Account Types",
        "KYC Status Tracking",
        "Nominee Management",
        "Auto-generated Account Details",
        "Account Status Management",
      ],
    },
    {
      title: "Transactions",
      icon: "📜",
      features: [
        "Transaction History",
        "Pagination",
        "Debit/Credit Tracking",
        "Transfer Records",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">
            Powerful Banking
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Features
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 max-w-3xl mx-auto text-lg">
            Shinrai Bank provides secure, modern, and intelligent banking
            solutions designed for speed, reliability, and convenience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-14">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-6 text-center">
            <h2 className="text-4xl font-bold">75+</h2>
            <p className="text-white/80">Features</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h2 className="text-4xl font-bold">50K+</h2>
            <p className="text-zinc-400">Users</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h2 className="text-4xl font-bold">99.9%</h2>
            <p className="text-zinc-400">Uptime</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="text-zinc-400">Support</p>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="grid lg:grid-cols-2 gap-8">
          {featureSections.map((section) => (
            <div
              key={section.title}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{section.icon}</div>
                <h2 className="text-3xl font-bold">
                  {section.title}
                </h2>
              </div>

              <div className="grid gap-3">
                {section.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 bg-zinc-900/60 rounded-xl px-4 py-3"
                  >
                    <span className="text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-10">
          <h2 className="text-4xl font-bold mb-4">
            Experience Modern Banking
          </h2>

          <p className="text-white/90 mb-6">
            Secure transactions, intelligent services, and premium user
            experience — all in one place.
          </p>

          <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Open an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;