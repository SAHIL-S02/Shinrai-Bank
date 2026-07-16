import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Privacy <span className="text-emerald-400">Policy</span>
          </h1>

          <p className="mt-4 text-zinc-400">
            Last Updated: June 2026
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 space-y-10">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Introduction
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Shinrai Bank values your privacy and is committed to protecting
              your personal and financial information. This Privacy Policy
              explains how we collect, use, store, and safeguard your data
              when you use our banking services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Information We Collect
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>• Full Name</li>
              <li>• Email Address</li>
              <li>• Phone Number</li>
              <li>• Date of Birth</li>
              <li>• Account Information</li>
              <li>• Transaction History</li>
              <li>• Device and Login Information</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. How We Use Your Information
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>• To provide banking services.</li>
              <li>• To process transactions securely.</li>
              <li>• To prevent fraud and unauthorized access.</li>
              <li>• To improve our products and services.</li>
              <li>• To comply with legal requirements.</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Security Measures
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              We implement industry-standard security practices including
              encryption, secure authentication, access controls, and
              continuous monitoring to protect customer data from
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. Data Sharing
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Shinrai Bank does not sell customer data. Information may be
              shared only when required by law, regulatory authorities,
              payment processing partners, or to protect our users and
              services.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              6. Cookies & Analytics
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              We may use cookies and analytics technologies to improve user
              experience, enhance security, and understand how our services
              are used.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              7. Your Rights
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>• Access your personal data.</li>
              <li>• Request corrections to inaccurate information.</li>
              <li>• Request account deletion where permitted.</li>
              <li>• Manage communication preferences.</li>
            </ul>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              8. Data Retention
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Customer information is retained only for as long as necessary
              to provide services, meet legal obligations, resolve disputes,
              and enforce agreements.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              9. Contact Us
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              If you have questions regarding this Privacy Policy, please
              contact us at:
            </p>

            <div className="mt-4 bg-zinc-900 rounded-2xl p-5">
              <p>Email: sksahilu735@gmail.com</p>
              <p>Phone: +91 96473 97722</p>
              <p>Kolkata 700124, West Bengal, India</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;