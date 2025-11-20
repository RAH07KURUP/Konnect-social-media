import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, HeartHandshakeIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random avatar generated!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0e0f1a] via-[#14182c] to-[#1c1236] flex items-center justify-center p-4 text-gray-200">
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-tight text-[#c3b7ff]">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROFILE PIC */}
          <div className="flex flex-col items-center gap-4">
            <div className="size-32 rounded-full border border-white/20 shadow-lg overflow-hidden bg-black/20">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full opacity-50">
                  <CameraIcon className="size-10" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleRandomAvatar}
              className="px-4 py-2 rounded-xl bg-[#7a5af5] hover:bg-[#6b48f0] transition-all flex items-center gap-2 shadow-lg"
            >
              <ShuffleIcon className="size-4" />
              Generate Random Avatar
            </button>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="text-sm opacity-80">Full Name</label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a5af5]"
              placeholder="Your full name"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm opacity-80">Bio</label>
            <textarea
              value={formState.bio}
              onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a5af5] h-24"
              placeholder="Tell others about yourself and your language goals"
            />
          </div>

          {/* LANGUAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm opacity-80">Native Language</label>
              <select
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                className="w-full mt-1 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a5af5]"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()} className="text-black">
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm opacity-80">Learning Language</label>
              <select
                value={formState.learningLanguage}
                onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                className="w-full mt-1 p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a5af5]"
              >
                <option value="">Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()} className="text-black">
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm opacity-80">Location</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 opacity-60" />
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="w-full mt-1 p-3 pl-10 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#7a5af5]"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7a5af5] to-[#9a6bff] hover:opacity-90 transition-all shadow-xl flex justify-center items-center gap-2"
          >
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin size-5" />
                Onboarding...
              </>
            ) : (
              <>
                <HeartHandshakeIcon className="size-5" />
                Complete Onboarding
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;