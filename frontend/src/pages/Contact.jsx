import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Contact <span className="text-emerald-400">Shinrai Bank</span>
          </h1>

          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Need help with your account, transactions, loans, or security?
            Our support team is available 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-semibold mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Customer Support</p>
                <div className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="break-all">sksahilu735@gmail.com</span> <span className="text-gray-500 text-sm">(Developer's Email)</span>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Phone Number</p>
                <div className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>+91 96473 97722</span> <span className="text-gray-500 text-sm">(Developer's Number)</span>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Head Office</p>
                <div className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Kolkata, West Bengal, India</span> <span className="text-gray-500 text-sm">(Not real)</span>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Working Hours</p>
                <div className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>24/7 Customer Support</span> <span className="text-gray-500 text-sm">(Not real)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span>Send a Message</span> <span className="text-gray-500 text-sm">(Not Working)</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Describe your issue..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-4 rounded-xl font-semibold text-white hover:scale-[1.02] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Quick Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-semibold">
              Card Support
            </h3>
            <p className="text-zinc-400 mt-2">
              Lost card, block card, card issues.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-semibold">
              Security Help
            </h3>
            <p className="text-zinc-400 mt-2">
              Fraud reporting and account security.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-semibold">
              Loan Assistance
            </h3>
            <p className="text-zinc-400 mt-2">
              Loan applications and EMI support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;