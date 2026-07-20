import { useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ value, onChange, onSend, onTyping }) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    onTyping?.();
  };

  const handleEmojiClick = (emojiData) => {
    onChange(value + emojiData.emoji);
  };

  return (
    <div className="flex items-center w-full px-2 pb-2 relative border-t border-white/10 pt-2">
      {showEmoji && (
        <div className="absolute bottom-16 left-2 z-10 pop-in">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}

      <div className="flex p-3 gap-3 text-white items-center">
        <Smile
          className={`h-5 w-5 cursor-pointer transition-all duration-200 hover:scale-125 hover:text-[#f5b942] ${
            showEmoji ? "text-amber-400 scale-110" : ""
          }`}
          onClick={() => setShowEmoji((s) => !s)}
        />
      </div>

      <div className="search-bar p-3 flex-1">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full pl-3 h-10 bg-white rounded-full transition-shadow duration-200 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.35)] outline-none"
            type="text"
            placeholder="Type a message..."
            value={value}
            onChange={handleChange}
            onFocus={() => setShowEmoji(false)}
          ></input>
        </form>
      </div>

      <div className="flex">
        <button
          className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:hover:scale-100"
          onClick={onSend}
          disabled={!value.trim()}
        >
          <Send size={28} className="text-white font-sm rounded-full mr-2" />
        </button>
      </div>
    </div>
  );
}
