import { useAuth } from "../context/AuthContext";
import Login from "./Login";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3 fade-in">
          <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-red-500 animate-spin" />
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return children;
}
