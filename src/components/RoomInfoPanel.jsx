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
    <div className="border border-white rounded-r-2xl flex-shrink-0 w-[20%] min-w-[200px] p-5 mb-0 flex flex-col">
      <div className="flex flex-col gap-3 justify-center items-center py-[5%]">
        <div className="h-[6em] w-[6em] rounded-full bg-red-600 flex items-center justify-center text-white text-3xl font-bold">
          {room?.name?.[0]?.toUpperCase() || "No room selected"}
        </div>
        <div className="text-center text-white text-xl font-bold">
          <h4>{room ? ` ${room.name}` : "No room selected"}</h4>
        </div>
      </div>

      <div className="flex justify-between items-center mt-[8%]">
        <div className="w-full">
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer"
          >
            <h4 className="text-white opacity-100 font-bold text-sm">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </h4>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
            <h4 className="text-white opacity-100 font-bold text-sm">Privacy & Help</h4>
            <ChevronDown size={28} strokeWidth={1} />
          </button>
          <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
            <h4 className="text-white opacity-100 font-bold text-sm">Shared Photos</h4>
            <ChevronDown size={28} strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
}
