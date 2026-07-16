import { useEffect } from "react";
import { rtdb, db } from "../config/firebase";
import { ref, onValue, onDisconnect, set, serverTimestamp as rtdbTimestamp } from "firebase/database";
import { doc, setDoc, serverTimestamp as firestoreTimestamp } from "firebase/firestore";

// Marks the current user online in Realtime Database, and automatically
// flips them to offline the moment their connection drops (tab closed,
// wifi dies, etc) — that's what onDisconnect() does, it's a promise Firebase
// keeps even if the browser never gets to run any of our JS again.
// Also keeps a matching user profile doc in Firestore (users/{uid}) so
// other parts of the app (like a member list) can read name/photo/lastSeen.
export function usePresence(user) {
  useEffect(() => {
    if (!user) return;

    const statusRef = ref(rtdb, `status/${user.uid}`);
    const userDocRef = doc(db, "users", user.uid);

    // Firebase's special ".info/connected" path tells us our actual
    // connection state — re-fires on reconnects too.
    const connectedRef = ref(rtdb, ".info/connected");
    const unsubscribe = onValue(connectedRef, (snap) => {
      if (snap.val() === false) return;

      onDisconnect(statusRef)
        .set({ state: "offline", lastChanged: rtdbTimestamp() })
        .then(() => {
          set(statusRef, { state: "online", lastChanged: rtdbTimestamp() });
        });
    });

    setDoc(
      userDocRef,
      {
        name: user.displayName || user.email,
        email: user.email,
        photoURL: user.photoURL || null,
        lastSeen: firestoreTimestamp(),
      },
      { merge: true }
    );

    return () => unsubscribe();
  }, [user]);
}
