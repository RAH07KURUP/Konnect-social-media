import { useState } from "react";
import { HeartHandshake} from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0e0f1a] via-[#13172a] to-[#1b1033] p-4">
      <div className="w-full max-w-5xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/10 rounded-3xl">
        
        {/* LEFT SECTION */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-gray-950/40 border border-white/10 rounded-3xl shadow-2xl mt-[2.5%] w-[95%] m-[2.5%]">
          
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3">
            <HeartHandshake className="size-10 text-indigo-400" />
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Konnect
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Signup failed"}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-white">Create Your Account</h2>
              <p className="opacity-70 text-sm text-blue-400">
                Join the Konnect community and start connecting instantly.
              </p>
            </div>

            <div className="flex flex-col gap-4">

              {/* FULL NAME */}
              <label className="flex flex-col gap-2 text-white/80">
                Full Name
                <input
                  type="text"
                  className="input input-bordered bg-white/5 border-white/10 text-white placeholder-white/40"
                  placeholder="John Doe"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
              </label>

              {/* EMAIL */}
              <label className="flex flex-col gap-2 text-white/80">
                Email
                <input
                  type="email"
                  className="input input-bordered bg-white/5 border-white/10 text-white placeholder-white/40"
                  placeholder="john@gmail.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </label>

              {/* PASSWORD */}
              <label className="flex flex-col gap-2 text-white/80">
                Password
                <input
                  type="password"
                  className="input input-bordered bg-white/5 border-white/10 text-white placeholder-white/40"
                  placeholder="••••••••"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xs opacity-60 mt-1">
                  Must be at least 6 characters long.
                </p>
              </label>

              {/* TERMS CHECKBOX */}
              <label className="flex items-center gap-2 cursor-pointer text-white/80 text-xs">
                <input type="checkbox" className="checkbox checkbox-sm bg-indigo-400" required />
                I agree to the&nbsp;
                <span className="text-indigo-400 hover:underline">terms of service</span>
                &nbsp;and&nbsp;
                <span className="text-indigo-400 hover:underline">privacy policy</span>.
              </label>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 border-none text-white rounded-xl py-3 text-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* LOGIN LINK */}
              <p className="text-center text-white/70 text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT SECTION (INLINE IMAGE + TEXT) */}
        <div className="lg:flex items-center justify-center p-10">
          <div className=" items-center gap-10 max-w-2xl text-white/90">

            {/* IMAGE */}
            <img
              src="/i.png"
              className="w-[70%] ml-[15%] drop-shadow-xl rounded-xl opacity-90"
              alt="Signup illustration"
            />

            {/* TEXT */}
            <div className="space-y-3 mt-[5%] ml-[13%]">
              <h2 className="text-2xl font-semibold">
                Join a global community
              </h2>
              <p className="opacity-70">
                Meet new people, share experiences, and connect effortlessly with others.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
