import React, { useContext, useState } from 'react'
import { AccessTokenContextInfo } from '@/contexts/AccessTokenContext';
import { checkBalance } from '@/services/api';
const CheckBalance = () => {
  const [loading, setLoading] = useState(false);
    const [after, setAfter] = useState(false);
    const {accessToken} = useContext(AccessTokenContextInfo);
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState(0);
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        setLoading(true);
        const res = await checkBalance(password);
        console.log(res);
        setAfter(true);
        setBalance(res.data.balance);
      }catch (e){
        console.log(e.message);
      }finally{
        setLoading(false);
      }
    }
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
                Check Balance
              </h2>

              {/* Password */}
              <div className={after? "hidden":""}>
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
                className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 ${after? "hidden":""}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Checking...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <div
                  className={`${
                    after ? "" : "hidden"
                  } bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-8 text-center shadow-2xl`}
                >
                  <p className="text-white/80 text-sm uppercase tracking-wider">
                    Available Balance
                  </p>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                    ₹ {Number(balance).toLocaleString("en-IN")}
                  </h1>

                  <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <span className="text-lg">💳</span>
                    <span className="text-white text-sm">
                      Shinrai Bank Account
                    </span>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CheckBalance