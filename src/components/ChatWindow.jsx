import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Phone, Video, Info } from "lucide-react";
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
      <div className="border-1 border-white flex-1 h-full flex items-center justify-center">
        <p className="text-white/60">Select a room, or create a new one to get started.</p>
      </div>
    );
  }

  return (
    <div className="border-1 border-white flex-1 h-full flex flex-col">
      <div className="border-1 border-white w-full h-[8%] min-h-[60px] pt-3 pl-3 pb-2 flex align-center">
        <div className="border-white w-full leading-tight ml-2 text-white flex justify-between align-center">
          <div className="mt-2">
            <h1 className="font-bold font-sm"> {room?.name || "Loading..."}</h1>
            <h3 className="font-sm text-xs text-white/60 h-4">
              {typingUsers.length > 0
                ? `${typingUsers.join(", ")} ${typingUsers.length === 1 ? "is" : "are"} typing...`
                : ""}
            </h3>
          </div>
          <div className="flex gap-3 mt-2 text-sm mr-3">
            <Phone className="cursor-pointer" />
            <Video className="cursor-pointer" />
            <Info className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-white/50 text-sm text-center mt-4">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-white/50 text-sm text-center mt-4">
            No messages yet — say hi!
          </p>
        ) : (
          messages.map((msg) => (
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