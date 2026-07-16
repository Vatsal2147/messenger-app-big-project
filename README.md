# 💬 Messenger App

A real-time messaging app built with React, Firebase, and Tailwind CSS —
Google/email auth, live multi-room chat, presence, typing indicators,
image sharing, emoji picker, and dark mode.

## Features

* Google & email/password sign-in (Firebase Auth)
* Protected app — must be signed in to view the chat
* **Multiple chat rooms** — create a room, browse the room list, click to join (`react-router-dom`)
* **Real-time messaging** — messages sync live across every open tab/device (Firestore `onSnapshot`)
* **Online/offline presence** — green dot next to users currently connected (Realtime Database + `onDisconnect`)
* **Typing indicators** — "X is typing..." per room, live (Realtime Database)
* **Image sharing** — upload an image into any room (Firebase Storage)
* **Emoji picker** — pick an emoji to insert into your message
* **Dark / light mode toggle** — persisted in `localStorage`
* Firestore, Storage, and Realtime Database security rules included

## Technologies Used

* React 19 + React Router 7
* Firebase — Auth, Firestore, Realtime Database, Storage
* Tailwind CSS 4
* Vite
* Lucide React (icons) + emoji-picker-react

## Data Model

```
Firestore:
  users/{uid}                → { name, email, photoURL, lastSeen }
  rooms/{roomId}              → { name, createdBy, createdAt }
  rooms/{roomId}/messages/{id}→ { type, text | imageURL, senderId, senderName, senderPhoto, timestamp }

Realtime Database:
  status/{uid}                → { state: "online" | "offline", lastChanged }
  typing/{roomId}/{uid}       → { name }

Storage:
  chat-images/{roomId}/{timestamp}_{filename}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Firebase project's config
   values, including `VITE_FIREBASE_DATABASE_URL` (from Realtime Database
   once you enable it — see below).
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Firebase Console Setup Checklist

In [console.firebase.google.com](https://console.firebase.google.com), for your project:

- **Authentication → Sign-in method** → enable **Google** and **Email/Password**
- **Firestore Database** → Create database (test mode is fine to start) → then go to **Rules** tab and paste in `firestore.rules` from this repo → Publish
- **Realtime Database** → Create database → copy the URL it gives you into `VITE_FIREBASE_DATABASE_URL` in `.env` → go to **Rules** tab and paste in `database.rules.json` → Publish
- **Storage** → Get started → go to **Rules** tab and paste in `storage.rules` → Publish

## Deployment

This project deploys to GitHub Pages via `gh-pages`:
```bash
npm run deploy
```
Uses `HashRouter` (URLs look like `.../#/room/abc123`) specifically so
room links keep working after a refresh on GitHub Pages, which has no
server-side rewrite for client-side routes.

Make sure your `.env` values are present at build time — never commit
`.env` itself (it's git-ignored).

## Future Improvements

* Private 1-on-1 DMs (current rooms are public/group, per the course spec)
* Room membership / private rooms
* Message reactions
* Push notifications
