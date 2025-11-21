import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests, acceptFriendRequest } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({ queryKey: ["friendRequests"], queryFn: getFriendRequests });
  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incoming = friendRequests?.incomingReqs || [];
  const accepted = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <>
            {incoming.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-base-content">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incoming.length}</span>
                </h2>

                <div className="space-y-3">
                  {incoming.map((req) => (
                    <div key={req._id} className="bg-base-200 rounded-xl border border-base-300 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                            <img src={req.sender.profilePic} alt={req.sender.fullName} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-base-content">{req.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="badge badge-secondary">Native: {req.sender.nativeLanguage}</span>
                              <span className="badge badge-outline">Learning: {req.sender.learningLanguage}</span>
                            </div>
                          </div>
                        </div>

                        <button className="btn btn-primary btn-sm" onClick={() => acceptRequest(req._id)} disabled={isPending}>
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {accepted.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-base-content">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {accepted.map((notif) => (
                    <div key={notif._id} className="bg-base-200 rounded-xl border border-base-300 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-success/20">
                          <img src={notif.recipient.profilePic} alt={notif.recipient.fullName} />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-base-content">{notif.recipient.fullName}</h3>
                          <p className="text-sm opacity-70 mt-1">{notif.recipient.fullName} accepted your friend request</p>
                          <p className="text-xs flex items-center opacity-60 mt-1"><ClockIcon className="h-3 w-3 mr-1" />Recently</p>
                        </div>

                        <div className="badge badge-success gap-1">
                          <MessageSquareIcon className="h-3 w-3 mr-1" />
                          New Friend
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incoming.length === 0 && accepted.length === 0 && <NoNotificationsFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
