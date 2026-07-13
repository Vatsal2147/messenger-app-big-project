import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const contacts = [
  {
    id: 1,
    name: "Jane Cooper",
    img: "https://i.pravatar.cc/150?img=1",
    lastSeen: "Active 2m ago",
  },
  {
    id: 2,
    name: "Esther Howard",
    img: "https://i.pravatar.cc/150?img=2",
    lastSeen: "Active 10m ago",
  },
  {
    id: 3,
    name: "Cody Fisher",
    img: "https://i.pravatar.cc/150?img=3",
    lastSeen: "Active 1h ago",
  },
];

export default function App() {
  const [activeContact, setActiveContact] = useState(contacts[0]);

  return (
    <div className="parent">
      <div className="parent1">
        <Sidebar
          contacts={contacts}
          activeContact={activeContact}
          setActiveContact={setActiveContact}
        />

        <ChatWindow activeContact={activeContact} />

        <div className="border border-white rounded-r-2xl flex-shrink-0 w-[20%] min-w-[200px] p-5 mb-0 flex flex-col">
          <div className="flex flex-col gap-3 justify-center items-center py-[5%]">
            <img className="rounded-full h-[6em] w-[6em]" src={activeContact.img}></img>
            <div className="text-center text-white text-xl font-bold">
              <h4>{activeContact.name}</h4>
              <h6 className="text-sm text-green-500">Active Now</h6>
            </div>
          </div>

          <div className="flex justify-between items-center mt-[8%]">
            <div className="w-full">
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">Set up a chat </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className=" text-white opacity-100 font-bold text-sm">Privacy & Help</h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">Shared Files </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">Shared Photos </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}