export default function MessageBubble({ text, type, imageURL, isSent, senderName }) {
  return (
    <div className={`flex flex-col w-full px-3 py-1 ${isSent ? "items-end" : "items-start"}`}>
      {!isSent && senderName && (
        <span className="text-[11px] text-white/50 mb-0.5 ml-1">{senderName}</span>
      )}

      {type === "image" && imageURL ? (
        <img
          src={imageURL}
          alt="shared"
          className="max-w-[60%] rounded-2xl border border-white/20"
        />
      ) : (
        <div
          className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm break-words ${
            isSent ? "bg-red-600 text-white" : "bg-white text-black"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
