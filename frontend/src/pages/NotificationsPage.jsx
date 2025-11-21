import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getFriendRequests, acceptFriendRequest } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({ queryKey: ["friendRequests"], queryFn: getFriendRequests });
  const { mutate: acceptRequest, isPending } = useMutation({ mutationFn: acceptFriendRequest, onSuccess: () => { queryClient.invalidateQueries(["friendRequests"]); queryClient.invalidateQueries(["friends"]); } });

  const incoming = friendRequests?.incomingReqs || [];
  const accepted = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {isLoading ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
        ) : (
          <>
            {incoming.length > 0 ? incoming.map(req => (
              <div key={req._id} className="card-neon p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#7c3aed]/20"><img src={req.sender.profilePic} alt="" /></div>
                    <div><div className="font-semibold text-white">{req.sender.fullName}</div><div className="text-xs text-gray-300">Requested to connect</div></div>
                  </div>
                  <div><button className="btn-neon px-4 py-2 rounded-lg" onClick={() => acceptRequest(req._id)} disabled={isPending}>Accept</button></div>
                </div>
              </div>
            )) : null}

            {accepted.length > 0 ? accepted.map(notif => (
              <div key={notif._id} className="card-neon p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-300/20"><img src={notif.recipient.profilePic} alt="" /></div>
                  <div className="flex-1"><div className="font-semibold text-white">{notif.recipient.fullName}</div><div className="text-xs text-gray-300">accepted your request</div></div>
                  <div className="text-xs text-gray-400 flex items-center gap-2"><ClockIcon className="w-3 h-3" />Recently</div>
                </div>
              </div>
            )) : null}

            {incoming.length === 0 && accepted.length === 0 && <NoNotificationsFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
