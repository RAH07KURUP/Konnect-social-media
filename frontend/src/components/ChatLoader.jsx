import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-base-200">
      <LoaderIcon className="animate-spin size-10 text-purple-600" />
      <p className="mt-4 text-center text-lg font-semibold text-gray-700">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;
