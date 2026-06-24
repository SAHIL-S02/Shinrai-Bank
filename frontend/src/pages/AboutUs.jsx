import React from "react";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold">
            About <span className="text-emerald-400">Shinrai Bank</span>
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-3xl mx-auto">
            Shinrai Bank is a modern digital banking platform built to provide
            secure, fast, and seamless financial services for everyone.
            Our mission is to simplify banking through technology while
            maintaining the highest standards of trust and security.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-zinc-400 leading-relaxed">
              To make banking accessible, transparent, and secure by leveraging
              modern technology and innovative financial solutions.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-zinc-400 leading-relaxed">
              To become the most trusted digital banking platform, empowering
              millions of users with efficient and secure financial services.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold">50K+</h3>
            <p className="text-white/80 mt-2">Users</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold">₹10Cr+</h3>
            <p className="text-zinc-400 mt-2">Transactions</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold">99.9%</h3>
            <p className="text-zinc-400 mt-2">Uptime</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-zinc-400 mt-2">Support</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-3">
                Secure Banking
              </h3>
              <p className="text-zinc-400">
                Industry-standard encryption and authentication keep your money
                and data safe.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-3">
                Instant Transfers
              </h3>
              <p className="text-zinc-400">
                Transfer money quickly using account numbers, phone numbers,
                or UPI IDs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-3">
                Premium Experience
              </h3>
              <p className="text-zinc-400">
                Clean design, seamless transactions, and a user-friendly
                banking experience.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
          <h2 className="text-4xl font-bold text-center mb-8">
            Built By
          </h2>

          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto flex items-center justify-center text-4xl font-bold">
              S
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              SK SAHIL UDDIN
            </h3>

            <p className="text-zinc-400 mt-2">
              Founder & Full Stack Developer
            </p>

            <p className="max-w-2xl mx-auto mt-6 text-zinc-400">
              Passionate about software engineering, fintech, AI, and building
              innovative solutions that simplify people's lives through
              technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;