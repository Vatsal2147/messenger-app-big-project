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

## What was built with AI
* In a complete sense, this projcet has been made by me. I asked AI for design inspirations when i was first starting out, also, i Couldnt configure how the "rooms" and the "listener" was waorking, so spent way too much time with claude to discuss it. The emoji implementation has been added completely by AI. This is project i took up over the summer in guidance of a mentor from my college, so she helped me more than the Ai ever could.

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

## v2 eval results by Claude

*The Messenger App is a well-implemented real-time communication application that demonstrates a strong understanding of modern frontend development and Firebase-based backend services. One of its major strengths is its use of multiple Firebase services for different purposes, including Firebase Authentication for user login, Firestore for storing users, rooms, and messages, Realtime Database for online presence and typing indicators, and Firebase Storage for image sharing. The project is also well-organized into components, hooks, contexts, and configuration files, which makes the codebase relatively easy to understand and maintain. The implementation of real-time messaging and presence features adds significant technical depth compared with a basic CRUD application. The inclusion of Firebase security rules is another positive aspect, as it shows awareness of authentication and data-access security. However, there are several areas that could be improved. The application currently has limited private messaging and room-membership functionality, meaning more robust authorization would be required for a production-ready system. Message pagination could also be implemented to improve performance when conversations contain a large number of messages. Additionally, the project would benefit from automated unit and integration testing to ensure reliability and make future changes safer. Further improvements could include message editing/deletion, stronger error handling, improved loading and empty states, and additional UI/UX refinements. Overall, the project is a strong student-level implementation that successfully demonstrates practical knowledge of React, Firebase, real-time systems, authentication, and database management, while still having clear opportunities for improvement in scalability, testing, and production-level authorization.

## Limitations

* Doesn't contain private 1-on-1 DMs (current rooms are public/group, per the course spec)
* No Room membership / private rooms yet
* Message reactions are yet to be installed
* Push notifications are not enabled, currently being worked on.

