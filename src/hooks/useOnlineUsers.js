import { useEffect, useState } from "react";
import { db, rtdb } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";

// Merges the Firestore `users` collection (name/photo) with live
// online/offline state from Realtime Database `status/{uid}`.
export function useOnlineUsers() {
  const [users, setUsers] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubStatus = onValue(ref(rtdb, "status"), (snap) => {
      setStatusMap(snap.val() || {});
    });
    return () => {
      unsubUsers();
      unsubStatus();
    };
  }, []);

  return users.map((u) => ({
    ...u,
    online: statusMap[u.id]?.state === "online",
  }));
}
