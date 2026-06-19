import {
  ChevronDown,
  Ellipsis,
  FileText,
  Image,
  Info,
  Maximize2,
  Mic,
  Phone,
  Send,
  SquarePen,
  Video,
} from "lucide-react";
import React from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import RightArea from "./components/RightArea";

function App() {
  return (
    <div className="parent">
      <div className="parent1">
        <Sidebar/>
        <ChatArea/>
        <RightArea/>
      </div>
    </div>
  );
}

export default App;
