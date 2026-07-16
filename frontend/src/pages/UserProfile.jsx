import React, { useContext, useEffect } from "react";
import { UserDataContextInfo } from "@/contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserDataContextInfo);
    const {isLogedIn, setIsLogedIn} = useContext(UserDataContextInfo);
    const reset = ()=>{
        navigate("/");
        setIsLogedIn(false);
        setUserData({
        name:"",
        nickName:"",
        email:"",
        aadharNumber:"",
        userId:"",
        phoneNumber:"",
        address:"",
        verified:false,
        dob:null,
        nickName:"",
        branchCode:"",
        ifscCode:"",
        accountNumber:"",
        cardType:"",
        cardNumber:"",
        cardValid:null,
        cardCVV:"",
        status:"",
        bankBalance:0,
        kycVerified:true,
        transactions:[],
    })
    }
    useEffect(() => {
            if (!isLogedIn) {
                navigate("/login");
            }
    }, [isLogedIn, navigate]);
  const user = userData;
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl font-bold">
            {user.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">
              {user.name}
            </h1>

            <p className="text-zinc-400 mt-2">
              {user.email}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-300">
                KYC Verified
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-6 flex flex-col justify-between">
    <div>
      <p className="text-white/80">
        Account Balance
      </p>

      <h2 className="text-2xl font-bold mt-2">
        Secure Balance Check
      </h2>
    </div>

    <button
      onClick={() => navigate("/check-balance")}
      className="mt-6 bg-white text-black font-semibold px-5 py-3 rounded-xl hover:scale-105 transition"
    >
      Check Balance
    </button>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
    <p className="text-zinc-400">
      Account Type
    </p>

    <h2 className="text-2xl font-semibold mt-2">
      {user.accountType}
    </h2>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
    <p className="text-zinc-400">
      Phone Number
    </p>

    <h2 className="text-2xl font-semibold mt-2">
      {user.phoneNumber}
    </h2>
  </div>
</div>

        {/* Personal Information */}
        <div className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Full Name" value={user.name} />
            <InfoCard title="Email Address" value={user.email} />
            <InfoCard title="Phone Number" value={user.phoneNumber} />
            <InfoCard title="Account Type" value={user.accountType} />
          </div>
        </div>

        {/* Banking Information */}
        <div className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Banking Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              title="Account Number"
              value={user.accountNumber}
            />

            <InfoCard
              title="IFSC Code"
              value={user.ifscCode}
            />

            <InfoCard
              title="Branch"
              value={user.branchCode}
            />

            <InfoCard
              title="KYC Status"
              value={user.kycVerified ? "Verified" : "Pending"}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold">
            Edit Profile
          </button>

          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10">
            Download Statement
          </button>

          <button className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400" onClick={()=>{reset()}}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-zinc-900/50 rounded-2xl p-5">
    <p className="text-zinc-400 text-sm">
      {title}
    </p>

    <h3 className="text-lg font-semibold mt-2 break-all">
      {value}
    </h3>
  </div>
);

export default UserProfile;