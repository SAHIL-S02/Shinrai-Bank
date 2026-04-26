import { useState } from "react";
import { registerUser } from "@/services/api";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    aadharNumber: "",
    address: "",
    mobile: "",
    email: "",
    accountType: "",
    balance: "",
    nickname: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      alert(response);
      if (response === "User registered successfully!") {
        navigate("/login");
      }
    } catch (err) {
      alert("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 bg-zinc-950 overflow-hidden text-zinc-100">
      {/* Background Orbs & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-3xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 p-8 md:p-10 rounded-3xl shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Open New Account
          </h2>
          <p className="text-zinc-400 mt-3 text-sm md:text-base">
            Join Shinrai Bank and start your journey towards financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Full Name</label>
            <input
              name="name"
              placeholder="Sk Sahil Uddin"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Aadhar Number</label>
            <input
              name="aadharNumber"
              placeholder="1234 5678 9012"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Residential Address</label>
            <input
              name="address"
              placeholder="123 Bank St, Financial District"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Mobile Number</label>
            <input
              name="mobile"
              placeholder="+91 96473 97722"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="sahil@example.com"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Account Type</label>
            <div className="relative">
              <select
                name="accountType"
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
              >
                <option value="" className="bg-zinc-900">Select Type</option>
                <option value="SAVINGS" className="bg-zinc-900">Savings Account</option>
                <option value="CURRENT" className="bg-zinc-900">Current Account</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Initial Deposit</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-zinc-500">₹</span>
              </div>
              <input
                type="number"
                name="balance"
                placeholder="5000"
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Account Nickname (Optional)</label>
            <input
              name="nickname"
              placeholder="e.g. Dream Fund"
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="w-full relative group overflow-hidden rounded-xl p-[1px]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <div className="relative bg-zinc-950/50 backdrop-blur-md px-6 py-4 rounded-xl flex items-center justify-center gap-2 group-hover:bg-zinc-950/30 transition-all duration-300">
              <span className="font-semibold text-white tracking-wide">Complete Registration</span>
              <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </button>
        </div>
      </form>
    </section>
  );
};