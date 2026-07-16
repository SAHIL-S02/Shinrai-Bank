import React, { useState } from "react";

const Loan = () => {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);

  const interestRate = 10.5;
  const emi =
    ((amount * (interestRate / 100 / 12)) *
      Math.pow(1 + interestRate / 100 / 12, months)) /
    (Math.pow(1 + interestRate / 100 / 12, months) - 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">
          Loans
        </h1>

        <p className="text-zinc-400 text-lg mb-10">
          Quick approvals, flexible repayment options, and competitive interest rates.
        </p>

        {/* Loan Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="text-4xl mb-4"> </div>
            <h3 className="text-xl font-semibold mb-2">Home Loan</h3>
            <p className="text-zinc-400">
              Up to ₹50 Lakhs with attractive interest rates.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="text-4xl mb-4"> </div>
            <h3 className="text-xl font-semibold mb-2">Vehicle Loan</h3>
            <p className="text-zinc-400">
              Finance your dream car or bike instantly.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="text-4xl mb-4"> </div>
            <h3 className="text-xl font-semibold mb-2">Personal Loan</h3>
            <p className="text-zinc-400">
              Instant personal loans with minimal paperwork.
            </p>
          </div>
        </div>

        {/* Eligibility Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Pre-approved Loan Offer
          </h2>

          <p className="text-white/90 mb-4">
            You're eligible for a loan up to
          </p>

          <h3 className="text-3xl sm:text-5xl font-bold">
            ₹5,00,000
          </h3>

          <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Apply Now
          </button>
        </div>

        {/* EMI Calculator */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-8">
            EMI Calculator
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-zinc-300">
                Loan Amount
              </label>

              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />

              <p className="mt-2 text-2xl font-semibold">
                ₹ {amount.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">
                Tenure (Months)
              </label>

              <input
                type="range"
                min="6"
                max="84"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full"
              />

              <p className="mt-2 text-2xl font-semibold">
                {months} Months
              </p>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400">
                Estimated EMI
              </p>

              <h3 className="text-4xl font-bold text-emerald-400 mt-2">
                ₹ {Math.round(emi).toLocaleString("en-IN")}
              </h3>

              <p className="text-zinc-500 mt-2">
                Interest Rate: {interestRate}% p.a.
              </p>
            </div>
          </div>
        </div>

        {/* Existing Loan */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-6">
            Active Loan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-zinc-400">Loan Type</p>
              <p className="text-xl font-semibold">Personal Loan</p>
            </div>

            <div>
              <p className="text-zinc-400">Outstanding Amount</p>
              <p className="text-xl font-semibold">₹1,25,000</p>
            </div>

            <div>
              <p className="text-zinc-400">Next EMI Date</p>
              <p className="text-xl font-semibold">15 July 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;