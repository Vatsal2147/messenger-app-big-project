import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setRooms(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createRoom = async (name, user) => {
    if (!name.trim() || !user) return null;
    const docRef = await addDoc(collection(db, "rooms"), {
      name: name.trim(),
      createdBy: user.uid,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  return { rooms, loading, createRoom };
}
