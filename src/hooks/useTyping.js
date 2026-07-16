import { useEffect, useRef, useState } from "react";
import { rtdb } from "../config/firebase";
import { ref, onValue, set, remove } from "firebase/database";

const STOP_TYPING_DELAY = 2000; // ms of silence before we clear "is typing"

// Tracks who's currently typing in a given room (excluding yourself), and
// gives you a `notifyTyping()` function to call on every keystroke.
export function useTyping(roomId, user) {
  const [typingUsers, setTypingUsers] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    const typingRef = ref(rtdb, `typing/${roomId}`);
    const unsubscribe = onValue(typingRef, (snap) => {
      const data = snap.val() || {};
      const names = Object.entries(data)
        .filter(([uid]) => uid !== user?.uid)
        .map(([, val]) => val.name);
      setTypingUsers(names);
    });
    return () => unsubscribe();
  }, [roomId, user]);

  const notifyTyping = () => {
    if (!roomId || !user) return;
    const myTypingRef = ref(rtdb, `typing/${roomId}/${user.uid}`);
    set(myTypingRef, { name: user.displayName || user.email });

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      remove(myTypingRef);
    }, STOP_TYPING_DELAY);
  };

  // Clean up our own "typing" flag if we leave the room / unmount.
  useEffect(() => {
    return () => {
      if (roomId && user) {
        remove(ref(rtdb, `typing/${roomId}/${user.uid}`));
      }
      clearTimeout(timeoutRef.current);
    };
  }, [roomId, user]);

  return { typingUsers, notifyTyping };
}
