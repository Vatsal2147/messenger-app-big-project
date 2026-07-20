import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Phone, Video, Info, MessagesSquare } from "lucide-react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { useTyping } from "../hooks/useTyping";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ currentUser }) {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  const { typingUsers, notifyTyping } = useTyping(roomId, currentUser);

  // Load the room's own name/details.
  useEffect(() => {
    if (!roomId) return;
    getDoc(doc(db, "rooms", roomId)).then((snap) => {
      if (snap.exists()) setRoom({ id: snap.id, ...snap.data() });
    });
  }, [roomId]);

  // Live message listener — re-subscribes whenever the room changes.
  useEffect(() => {
    if (!roomId) return;
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (data) => {
    if (!currentUser || !roomId) return;
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email,
      senderPhoto: currentUser.photoURL || null,
      timestamp: serverTimestamp(),
      ...data,
    });
  };

  const handleSend = async () => {
    if (!draft.trim()) return;
    const text = draft;
    setDraft("");
    try {
      await sendMessage({ type: "text", text });
    } catch (err) {
      console.error("Failed to send message:", err);
      setDraft(text);
    }
  };

  if (!roomId) {
    return (
      <div className="border-1 border-white/20 flex-1 h-full flex flex-col items-center justify-center gap-3 fade-in">
        <MessagesSquare size={40} className="text-white/30" />
        <p className="text-white/60">Select a room, or create a new one to get started.</p>
      </div>
    );
  }

  return (
    <div className="border-1 border-white/20 flex-1 h-full flex flex-col">
      <div className="border-b border-white/20 w-full h-[8%] min-h-[60px] pt-3 pl-3 pb-2 flex align-center fade-in">
        <div className="border-white w-full leading-tight ml-2 text-white flex justify-between align-center">
          <div className="mt-2">
            <h1 className="font-bold font-sm"> {room?.name || "Loading..."}</h1>
            <h3 className="font-sm text-xs text-white/60 h-4 flex items-center gap-1">
              {typingUsers.length > 0 && (
                <span className="flex gap-0.5 items-end pb-0.5">
                  <span className="typing-dot w-1 h-1 rounded-full" style={{ background: "#f5b942" }} />
                  <span className="typing-dot w-1 h-1 rounded-full" style={{ background: "#f5b942" }} />
                  <span className="typing-dot w-1 h-1 rounded-full" style={{ background: "#f5b942" }} />
                </span>
              )}
              {typingUsers.length > 0
                ? `${typingUsers.join(", ")} ${typingUsers.length === 1 ? "is" : "are"} typing...`
                : ""}
            </h3>
          </div>
          <div className="flex gap-3 mt-2 text-sm mr-3">
            <Phone className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-red-400" size={18} />
            <Video className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-red-400" size={18} />
            <Info className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-red-400" size={18} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto thin-scroll">
        {loading ? (
          <p className="text-white/50 text-sm text-center mt-4 animate-pulse">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-white/50 text-sm text-center mt-4 fade-in">
            No messages yet — say hi!
          </p>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              type={msg.type}
              imageURL={msg.imageURL}
              senderName={msg.senderName}
              isSent={msg.senderId === currentUser?.uid}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <MessageInput
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        onTyping={notifyTyping}
      />
    </div>
  );
}
