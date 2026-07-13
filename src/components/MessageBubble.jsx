export default function MessageBubble({ text, isSent }) {
  return (
    <div className={`flex w-full px-3 py-1 ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm break-words ${
          isSent ? "bg-red-600 text-white" : "bg-white text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
}