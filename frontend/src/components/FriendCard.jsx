import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

/**
 * FriendCard - theme-reactive
 * Uses DaisyUI theme-aware classes so colors/backgrounds change with data-theme
 */

const FriendCard = ({ friend }) => {
  return (
    <div className="rounded-2xl p-4 bg-base-200 border border-base-300 hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
          <img src={friend.profilePic} alt={friend.fullName} className="object-cover w-full h-full" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base-content truncate">{friend.fullName}</h3>
          {friend.location && <p className="text-xs opacity-70 mt-1">{friend.location}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-sm text-primary inline-flex items-center gap-2">
          {getLanguageFlag(friend.nativeLanguage)}
          Native: {friend.nativeLanguage}
        </span>
        <span className="px-3 py-1 rounded-full border border-base-300 text-sm inline-flex items-center gap-2">
          {getLanguageFlag(friend.learningLanguage)}
          Learning: {friend.learningLanguage}
        </span>
      </div>

      <Link to={`/chat/${friend._id}`} className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg border border-base-300 hover:bg-primary/5 transition text-sm">
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
