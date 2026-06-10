import React, { useContext } from 'react'
import { useState } from "react";
import { UserTempContextInfo } from '@/contexts/UserTempContext';
import { verifyUser } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const navigate = useNavigate();
    const {userTemp} = useContext(UserTempContextInfo);
        const [form, setForm] = useState({
        email:userTemp.email,
        otp:0
        });
        const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(form);
            try{
                const response = await verifyUser(form);
                if(response.data.success){
                    navigate("/login");
                    alert("Verified");
                }
            }catch(err){
                if(err.response?.status == 409){
                    alert(err.response.data.message);
                    return;
                }
                if(err.response?.status == 401){
                    alert(err.response.data.message);
                    return;
                }
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
        className="relative z-10 w-full md:w-1/2 lg:w-1.5/3 pt-4 pb-4 p-2 m-2 md:p-6 max-w-3xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-2xl"
        >
            {/*Titles*/}
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Verify Your Email
                </h2>
                <p className="text-zinc-400 mt-3 text-sm md:text-base">
                Your your registered email for OTP
                </p>
            </div>
            <div className="flex flex-col md:flex-col gap-1 justify-center items-center">
                {/* OTP */}
                <div className="space-y-2 w-full md:w-1/2 lg:w-1.5/2 p-1 md:p-2">
                    <label className="text-sm font-medium text-zinc-300">OTP</label>
                    <input
                        type="text"
                        name="otp"
                        placeholder="OTP"
                        onChange={handleChange}
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                    />
                </div>
            </div >
            {/* Submit Button */}
            <div className="mt-10 flex flex-col items-center justify-center">
                <button
                type="submit"
                className="w-1/2 md:w-1/2 lg:w-1/3 md:p-2 relative group overflow-hidden rounded-xl p-[1px]"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <div className="relative bg-zinc-950/50 backdrop-blur-md px-6 py-4 rounded-xl flex items-center justify-center gap-2 group-hover:bg-zinc-950/30 transition-all duration-300">
                        <span className="font-semibold text-white tracking-wide">Verify</span>
                        <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </button>
            </div>
        </form>
    </section>
  )
}

export default OtpVerification