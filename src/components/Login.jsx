import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { MessageCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("signin"); // "signin" | "signup"

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Ambient ember glow, matching the main app's signature background */}
      <div
        className="absolute -top-40 -left-32 w-[32rem] h-[32rem] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #ef4444 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-32 w-[32rem] h-[32rem] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f5b942 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-sm p-6 border border-white/20 rounded-2xl flex flex-col gap-4 relative z-10 bg-white/[0.03] backdrop-blur-xl shadow-2xl fade-up">
        <div className="flex flex-col items-center gap-2 mb-1">
          <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
            <MessageCircle size={22} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold text-center">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-white/50 text-xs text-center">
            {mode === "signup"
              ? "Sign up to start chatting in real time."
              : "Sign in to pick up where you left off."}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
          <input
            className="p-3 text-sm text-white border border-white/30 rounded-lg bg-transparent transition-all duration-200 focus:border-red-500 focus:bg-white/5"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-3 text-sm text-white border border-white/30 rounded-lg bg-transparent transition-all duration-200 focus:border-red-500 focus:bg-white/5"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs fade-in">{error}</p>}
          <button
            type="submit"
            className="cursor-pointer bg-red-600 text-white rounded-lg py-2 font-bold hover:bg-red-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-red-900/30"
          >
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-white/40 text-[11px]">or</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        <button
          onClick={signInWithGoogle}
          className="cursor-pointer border border-white/30 text-white rounded-lg py-2 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="cursor-pointer text-white/60 text-xs text-center hover:text-white transition-colors duration-200"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "No account? Sign up"}
        </button>
      </div>
    </div>
  );
}
