import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, LogOut, Circle, MessageSquareText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRooms } from "../hooks/useRooms";
import { useOnlineUsers } from "../hooks/useOnlineUsers";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { rooms, loading, createRoom } = useRooms();
  const onlineUsers = useOnlineUsers();
  const [newRoomName, setNewRoomName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const roomId = await createRoom(newRoomName, user);
    setNewRoomName("");
    if (roomId) navigate(`/room/${roomId}`);
  };

  return (
    <div className="left flex-shrink-0 h-full flex flex-col">
      <div className="flex justify-between items-center h-10 mt-2 mb-2 fade-in">
        <h1 className="text-white font-bold text-lg flex items-center gap-2 ml-2">
          <MessageSquareText size={18} className="text-red-500" />
          Rooms
        </h1>
      </div>

      <form onSubmit={handleCreateRoom} className="flex gap-1 mb-3 fade-in" style={{ animationDelay: "0.05s" }}>
        <input
          type="text"
          placeholder="New room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="p-2 text-sm text-white border border-white/50 w-full h-9 rounded-lg bg-transparent transition-colors duration-200 focus:border-red-500"
        />
        <button
          type="submit"
          className="cursor-pointer bg-red-600 hover:bg-red-700 active:scale-90 transition-all duration-200 rounded-lg h-9 w-9 flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-900/40"
          title="Create room"
        >
          <Plus size={18} className="text-white" />
        </button>
      </form>

      <div className="flex flex-col gap-1 overflow-y-auto thin-scroll" style={{ maxHeight: "45%" }}>
        {loading ? (
          <p className="text-white/50 text-xs animate-pulse">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-white/50 text-xs">No rooms yet — create one above.</p>
        ) : (
          rooms.map((room, i) => (
            <NavLink
              key={room.id}
              to={`/room/${room.id}`}
              className={({ isActive }) =>
                `slide-in-left cursor-pointer border border-white/50 w-full rounded-lg flex items-center gap-2 h-10 px-3 text-white truncate transition-all duration-200 ${
                  isActive
                    ? "bg-red-500 border-red-400 shadow-md shadow-red-900/30"
                    : "hover:bg-white/10 hover:border-white/70 hover:translate-x-0.5"
                }`
              }
              style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
            >
               {room.name}
            </NavLink>
          ))
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-white/30 flex flex-col gap-1 flex-1 overflow-y-auto thin-scroll">
        <h2 className="text-white/70 text-xs font-bold mb-1">
          Online ({onlineUsers.filter((u) => u.online).length})
        </h2>
        {onlineUsers.map((u) => (
          <div key={u.id} className="flex items-center gap-2 px-1 py-1 fade-in">
            <Circle
              size={8}
              className={`${
                u.online ? "fill-green-500 text-green-500 pulse-dot" : "fill-white/30 text-white/30"
              } transition-colors duration-300`}
            />
            <span className="text-white/80 text-xs truncate">{u.name}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 pb-3 border-t border-white/30 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              className="h-9 w-9 rounded-full flex-shrink-0 ring-2 ring-white/20 transition-transform duration-200 hover:scale-105"
            />
          )}
          <span className="text-white/80 text-sm truncate">
            {user?.displayName || user?.email}
          </span>
        </div>
        <button
          onClick={logout}
          title="Logout"
          className="cursor-pointer text-red-500 hover:text-red-400 hover:rotate-6 transition-all duration-200 flex-shrink-0"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}
