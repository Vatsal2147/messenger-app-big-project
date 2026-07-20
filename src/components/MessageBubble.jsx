export default function MessageBubble({ text, type, imageURL, isSent, senderName }) {
  return (
    <div className={`fade-up flex flex-col w-full px-3 py-1 ${isSent ? "items-end" : "items-start"}`}>
      {!isSent && senderName && (
        <span className="text-[11px] text-white/50 mb-0.5 ml-1">{senderName}</span>
      )}

      {type === "image" && imageURL ? (
        <img
          src={imageURL}
          alt="shared"
          className="max-w-[60%] rounded-2xl border border-white/20 shadow-md transition-transform duration-200 hover:scale-[1.02]"
        />
      ) : (
        <div
          className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm break-words shadow-sm transition-transform duration-150 hover:-translate-y-0.5 ${
            isSent
              ? "bg-red-600 text-white rounded-br-sm shadow-red-900/30"
              : "bg-white text-black rounded-bl-sm"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
