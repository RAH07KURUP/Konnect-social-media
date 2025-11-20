import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0e0f1a] via-[#13172a] to-[#1b1033] p-4">
      <div className="w-full max-w-7xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/10 rounded-3xl">
        {/* LEFT SECTION */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-gray-950/40  border border-white/10 rounded-3xl shadow-2xl mt-[2.5%] w-[95%] m-[2.5%] ">
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3">
            <HeartHandshake className="size-10 text-indigo-400" />
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 ">
              Konnect
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Login failed"}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
              <p className="opacity-70 text-sm text-blue-400">Reconnect with your world instantly</p>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-white/80">
                Email
                <input
                  type="email"
                  className="input input-bordered bg-white/5 border-white/10 text-white placeholder-white/40"
                  placeholder="hello@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-white/80">
                Password
                <input
                  type="password"
                  className="input input-bordered bg-white/5 border-white/10 text-white placeholder-white/40"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </label>

              <button
                type="submit"
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 border-none text-white rounded-xl py-3 text-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-center text-white/70 text-sm mt-2">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-indigo-400 hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

       {/* RIGHT SECTION */}
<div className="lg:flex items-center justify-center p-10">
  <div className=" items-center gap-10 max-w-2xl text-white/90">

    {/* IMAGE */}
    <img
      src="/i.png"
      className="w-[70%] ml-[15%] drop-shadow-xl rounded-xl opacity-90"
      alt="Konnect illustration"
    />

    {/* TEXT CONTENT */}
    <div className="space-y-3 mt-[5%] ml-[13%]">
      <h2 className="text-2xl font-semibold">A modern space to connect</h2>
      <p className="opacity-70">
        Chat, share, and grow your social circle with a vibrant community.
      </p>
    </div>

  </div>
</div>

      </div>
    </div>
  );
};

export default LoginPage;
