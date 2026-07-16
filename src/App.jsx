import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import RoomInfoPanel from "./components/RoomInfoPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { usePresence } from "./hooks/usePresence";

export default function App() {
  return (
    <ProtectedRoute>
      <AppContent />
    </ProtectedRoute>
  );
}

// Reads roomId from the URL and remounts the room view (key={roomId})
// whenever it changes — that's what gives ChatWindow/RoomInfoPanel a
// clean slate per room instead of manually resetting state in effects.
function RoomRoute({ currentUser, theme, onToggleTheme }) {
  const { roomId } = useParams();
  return (
    <RoomView
      key={roomId || "home"}
      currentUser={currentUser}
      theme={theme}
      onToggleTheme={onToggleTheme}
    />
  );
}

function RoomView({ currentUser, theme, onToggleTheme }) {
  return (
    <>
      <ChatWindow currentUser={currentUser} />
      <RoomInfoPanel theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // Marks this user online/offline in real time for everyone else.
  usePresence(user);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={`parent ${theme}`}>
      <div className="parent1">
        <Sidebar />

        <Routes>
          <Route
            path="/"
            element={<RoomRoute currentUser={user} theme={theme} onToggleTheme={toggleTheme} />}
          />
          <Route
            path="/room/:roomId"
            element={<RoomRoute currentUser={user} theme={theme} onToggleTheme={toggleTheme} />}
          />
        </Routes>
      </div>
    </div>
  );
}
