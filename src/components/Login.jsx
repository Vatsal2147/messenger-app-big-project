import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

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
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm p-6 border border-white/30 rounded-2xl flex flex-col gap-4">
        <h1 className="text-white text-2xl font-bold text-center">
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h1>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
          <input
            className="p-3 text-sm text-white border border-white/30 rounded-sm bg-transparent"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-3 text-sm text-white border border-white/30 rounded-sm bg-transparent"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="cursor-pointer bg-red-600 text-white rounded-sm py-2 font-bold hover:bg-red-700"
          >
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          onClick={signInWithGoogle}
          className="cursor-pointer border border-white/30 text-white rounded-sm py-2 hover:bg-white/10"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="cursor-pointer text-white/60 text-xs text-center hover:text-white"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "No account? Sign up"}
        </button>
      </div>
    </div>
  );
}
