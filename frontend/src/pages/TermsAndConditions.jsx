import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold">
            Terms &{" "}
            <span className="text-emerald-400">
              Conditions
            </span>
          </h1>

          <p className="mt-4 text-zinc-400">
            Last Updated: June 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Acceptance of Terms
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              By accessing or using Shinrai Bank services, you agree to be
              bound by these Terms & Conditions. If you do not agree with any
              part of these terms, you should discontinue use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Eligibility
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Users must provide accurate and complete information during
              account registration. You are responsible for maintaining the
              confidentiality of your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Account Security
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>• Keep your password confidential.</li>
              <li>• Do not share OTPs with anyone.</li>
              <li>• Report suspicious activity immediately.</li>
              <li>• Use secure devices and networks when accessing services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Transactions
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Users are responsible for verifying recipient details before
              initiating transfers. Once successfully processed, transactions
              may not be reversible unless required by law or internal policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. Prohibited Activities
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>• Fraudulent transactions.</li>
              <li>• Unauthorized access attempts.</li>
              <li>• Identity theft or impersonation.</li>
              <li>• Money laundering or illegal financial activities.</li>
              <li>• Distribution of malicious software.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              6. Service Availability
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              While we strive to maintain uninterrupted service, Shinrai Bank
              does not guarantee continuous availability. Maintenance,
              upgrades, or unforeseen technical issues may temporarily affect
              service access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              7. Limitation of Liability
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Shinrai Bank shall not be liable for indirect, incidental, or
              consequential damages arising from the use or inability to use
              our services, except where prohibited by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              8. Account Suspension & Termination
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              We reserve the right to suspend or terminate accounts involved
              in suspicious, fraudulent, or illegal activities without prior
              notice where necessary for security or legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              9. Changes to Terms
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Shinrai Bank may modify these Terms & Conditions at any time.
              Updated terms will be posted on this page and become effective
              immediately upon publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              10. Contact Information
            </h2>

            <div className="bg-zinc-900 rounded-2xl p-5">
              <p>Email: sksahilu735@gmail.com</p>
              <p>Phone: +91 96473 97722</p>
              <p>Kolkata 700124, West Bengal, India</p>
            </div>
          </section>

        </div>

        {/* Agreement Card */}
        <div className="mt-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Banking With Confidence
          </h2>

          <p className="text-white/90 max-w-2xl mx-auto">
            By continuing to use Shinrai Bank, you acknowledge that you have
            read, understood, and agreed to these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;