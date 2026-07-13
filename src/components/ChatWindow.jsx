import { useState } from "react";
import { Phone, Video, Info } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ activeContact }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: draft, isSent: true }]);
    setDraft("");
  };

  return (
    <div className="border-1 border-white flex-1 h-full flex flex-col">
      <div className="border-1 border-white w-full h-[8%] min-h-[60px] pt-3 pl-3 pb-2 flex">
        <div className="border-white  inline-block pb-2">
          <img className="h-[2.5em] w-[2.75em] rounded-full" src={activeContact.img}></img>
        </div>
        <div className="border-white w-full leading-tight ml-2 mt-0.5 text-white flex justify-between">
          <div>
            <h1 className="font-bold font-sm ">{activeContact.name}</h1>
            <h3 className="font-sm">{activeContact.lastSeen}</h3>
          </div>
          <div className="flex gap-3 mt-2 text-sm mr-3 ">
            <Phone className="cursor-pointer" />
            <Video className="cursor-pointer" />
            <Info className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} isSent={msg.isSent} />
        ))}
      </div>
      <MessageInput value={draft} onChange={setDraft} onSend={handleSend} />
    </div>
  );
}