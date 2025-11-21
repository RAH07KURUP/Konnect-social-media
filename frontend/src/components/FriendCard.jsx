import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="rounded-2xl p-4 card-neon hover:shadow-neon transition">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#7c3aed]/25">
          <img src={friend.profilePic} alt={friend.fullName} className="object-cover w-full h-full" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{friend.fullName}</h3>
          {friend.location && <p className="text-xs text-gray-300 mt-1">{friend.location}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed]/20 to-[#4cc9f0]/10 text-xs text-indigo-200 inline-flex items-center gap-2">
          {getLanguageFlag(friend.nativeLanguage)}
          Native: {friend.nativeLanguage}
        </span>
        <span className="px-3 py-1 rounded-full border border-white/8 text-xs text-gray-200 inline-flex items-center gap-2">
          {getLanguageFlag(friend.learningLanguage)}
          Learning: {friend.learningLanguage}
        </span>
      </div>

      <Link to={`/chat/${friend._id}`} className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg border border-white/8 hover:bg-gradient-to-r from-[#7c3aed]/25 to-[#ff4d9d]/18 transition text-sm">
        Message
      </Link>
    </div>
  );
};

/* flag helper */
export function getLanguageFlag(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${langLower} flag`} className="h-3 mr-1 inline-block" />
    );
  }
  return null;
}

export default FriendCard;
