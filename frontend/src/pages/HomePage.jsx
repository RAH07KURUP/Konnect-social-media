// HomePage.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Your Friends</h2>
            <p className="text-sm text-gray-300 mt-1">Contacts you connect with frequently</p>
          </div>

          <Link to="/notifications" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a1240] bg-gradient-to-r from-[#0b0b12]/50 to-[#140d22]/30 hover:from-[#151026]/70 transition">
            <UsersIcon className="h-5 w-5 text-[#7c3aed]" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Connect with New Friends</h2>
                <p className="text-sm text-gray-300 mt-1">Find people with similar interests and start connecting.</p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="rounded-2xl bg-[#07102a] border border-[#1b0d2b] p-6 text-center">
              <h3 className="font-semibold text-lg text-white mb-2">No recommendations available</h3>
              <p className="text-gray-300">Check back later for new friends!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="rounded-2xl bg-[#07102a] border border-[#2a1240] hover:shadow-neon transition-all duration-200 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#7c3aed]/20">
                          <img src={user.profilePic} alt={user.fullName} className="object-cover w-full h-full" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg text-white">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs text-gray-300 mt-1">
                              <MapPinIcon className="h-4 w-4 mr-1 opacity-70" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed]/20 to-[#4cc9f0]/10 text-xs text-indigo-200 inline-flex items-center gap-2">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>

                        <span className="px-3 py-1 rounded-full border border-[#2a1240] text-xs text-gray-200 inline-flex items-center gap-2">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && <p className="text-sm text-gray-300 mt-3">{user.bio}</p>}
                    </div>

                    <div className="mt-4">
                      <button
                        className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
                          hasRequestBeenSent ? "bg-white/6 text-gray-300 cursor-default" : "bg-gradient-to-r from-[#7c3aed] to-[#ff4d9d] text-white shadow-md hover:opacity-95"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <span className="inline-flex items-center gap-2">
                            <CheckCircleIcon className="h-4 w-4" />
                            Request Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <UserPlusIcon className="h-4 w-4" />
                            Send Friend Request
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
