import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="
        fixed bottom-20 right-6 
        btn btn-circle 
        bg-gradient-to-r from-purple-600 to-blue-500 
        text-white shadow-xl border-none 
        hover:scale-105 transition-transform
      "
    >
      <VideoIcon className="size-6" />
    </button>
  );
}

export default CallButton;
