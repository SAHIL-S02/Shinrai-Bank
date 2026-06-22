import React, { useContext, useState } from "react";
import { AccessTokenContextInfo } from "@/contexts/AccessTokenContext";
import { sendMoney } from "@/services/api";
import { TransferToContextInfo } from "@/contexts/TransferToContext";
import { UserDataContextInfo } from "@/contexts/UserDataContext";
const SendMoney = () => {
  const {setUserData} = useContext(UserDataContextInfo);
    const {accessToken} = useContext(AccessTokenContextInfo);
    const {transferTo, setTransferTo} = useContext(TransferToContextInfo);
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");
  const update = async()=>{
    const res = await getDashboardData(accessToken);
      setUserData(res.data.user);
      console.log(res);
  }
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let target = receiver;
        if (transferTo === "BANK-UPI") {
            target = receiver.split("@")[0];
        }
        const res = await sendMoney(accessToken, target, Number(amount), password);
        console.log(res);
        if (!res.data.success) {
            alert(res.data.message);
            return;
        }
        alert(res.data.message);
        setReceiver("");
        setAmount("");
        setPassword("");
        update();
    } catch (err) {
        alert(
        err.response?.data?.message ||
        err.message ||
        "Transfer failed"
        );
    }
    };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950"></div>

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 px-6 lg:px-16">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              The Secure, easiest and fastest way to transfer money.
            </h1>

            <p className="mt-6 text-zinc-400 text-lg">
              Send money instantly using Account Number, Phone Number, or
              Bank UPI.
            </p>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
            >
              <h2 className="text-2xl font-semibold text-zinc-800">
                Send Money
              </h2>

              {/* Transfer Type */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">
                  Transfer To
                </label>

                <div className="relative">
                  <select
                    value={transferTo}
                    onChange={(e) => {
                      setTransferTo(e.target.value);
                      setReceiver("");
                    }}
                    className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 text-zinc-400 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Type</option>
                    <option value="ACCOUNT-NUMBER">
                      Account Number
                    </option>
                    <option value="PHONE-NUMBER">
                      Phone Number
                    </option>
                    <option value="BANK-UPI">
                      Bank UPI
                    </option>
                  </select>

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Dynamic Field */}
              {transferTo === "ACCOUNT-NUMBER" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    Account Number
                  </label>

                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Enter Account Number"
                    className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}

              {transferTo === "PHONE-NUMBER" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Enter Phone Number"
                    className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}

              {transferTo === "BANK-UPI" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="example@upi"
                    className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">
                  Amount (₹)
                </label>

                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SendMoney;