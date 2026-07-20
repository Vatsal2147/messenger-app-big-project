import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ChevronDown, Sun, Moon } from "lucide-react";

export default function RoomInfoPanel({ theme, onToggleTheme }) {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    getDoc(doc(db, "rooms", roomId)).then((snap) => {
      if (snap.exists()) setRoom({ id: snap.id, ...snap.data() });
    });
  }, [roomId]);

  return (
    <div className="border-l border-white/20 flex-shrink-0 w-[20%] min-w-[200px] p-5 mb-0 flex flex-col fade-in">
      <div className="flex flex-col gap-3 justify-center items-center py-[5%]">
        <div className="h-[6em] w-[6em] rounded-full bg-red-600 flex items-center justify-center text-white text-center text-3xl font-bold shadow-lg shadow-red-900/30 ring-4 ring-white/10 transition-transform duration-300 hover:scale-105">
          {room?.name?.[0]?.toUpperCase() || "No room selected"}
        </div>
        <div className="text-center text-white text-xl  font-bold">
          <h4>{room ? ` ${room.name}` : "No room selected"}</h4>
        </div>
      </div>

      <div className="flex justify-between items-center mt-[8%]">
        <div className="w-full">
          <button
            onClick={onToggleTheme}
            className="group flex items-center justify-between text-white border-white/30 border-t border-b w-full p-3 text-left hover:bg-red-600  cursor-pointer transition-colors duration-200"
          >
            <h4 className="text-white opacity-100 font-bold text-sm">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </h4>
            <span className="transition-transform duration-300 group-hover:rotate-45">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </span>
          </button>
          <button className="group flex items-center justify-between text-white border-white/30 border-t border-b w-full p-3 text-left hover:bg-red-600 cursor-pointer transition-colors duration-200">
            <h4 className="text-white opacity-100 font-bold text-sm">Privacy & Help</h4>
            <ChevronDown size={28} strokeWidth={1} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
          <button className="group flex items-center justify-between text-white border-white/30 border-t border-b w-full p-3 text-left hover:bg-red-600  cursor-pointer transition-colors duration-200">
            <h4 className="text-white opacity-100 font-bold text-sm">Shared Photos</h4>
            <ChevronDown size={28} strokeWidth={1} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
