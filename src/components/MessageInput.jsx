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
    <div className="flex items-center w-full px-2 pb-2 relative">
      {showEmoji && (
        <div className="absolute bottom-16 left-2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}

      <div className="flex p-3 gap-3 text-white items-center">
        <Smile
          className="h-5 w-5 cursor-pointer"
          onClick={() => setShowEmoji((s) => !s)}
        />
      </div>

      <div className="search-bar p-3 flex-1">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full pl-3 h-10 bg-white rounded-full"
            type="text"
            placeholder="Type a message..."
            value={value}
            onChange={handleChange}
            onFocus={() => setShowEmoji(false)}
          ></input>
        </form>
      </div>

      <div className="flex">
        <button className="cursor-pointer" onClick={onSend}>
          <Send size={28} className="text-black font-sm rounded-full" />
        </button>
      </div>
    </div>
  );
}