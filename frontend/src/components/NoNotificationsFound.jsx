import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="size-20 rounded-full bg-base-300/60 backdrop-blur-sm flex items-center justify-center mb-6 shadow-inner">
        <BellIcon className="size-10 text-base-content/50" />
      </div>

      <h3 className="text-xl font-semibold mb-2 tracking-tight">
        You're All Caught Up ✨
      </h3>

      <p className="text-base-content/60 max-w-sm leading-relaxed">
        New connection updates, requests, and alerts will appear here as soon
        as they happen.
      </p>
    </div>
  );
}

export default NoNotificationsFound;
