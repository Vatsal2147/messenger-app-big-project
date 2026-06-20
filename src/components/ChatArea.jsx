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
import React, { useState } from "react";

const CONTACT_IMG =
  "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";

const contacts = [
  { id: 1, name: "Contact 1", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
  { id: 2, name: "Contact 2", img: CONTACT_IMG, lastSeen: "Last seen yesterday 4:23am" },
  { id: 3, name: "Contact 3", img: CONTACT_IMG, lastSeen: "Last seen yesterday 7:59pm" },
  { id: 4, name: "Contact 4", img: CONTACT_IMG, lastSeen: "Last seen yesterday 2:46am" },
  { id: 5, name: "Contact 5", img: CONTACT_IMG, lastSeen: "Last seen yesterday 1:44pm" },
  { id: 6, name: "Contact 6", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53am" },
];

function ChatArea() {
   const [activeContact, setActiveContact] = useState(contacts[0]);
  return (
    <div className="border-1 border-white w-140 h-full">
              <div className="border-1 border-white w-140 h-15 pt-2 pl-2 pb-2 flex">
                <div className="border-white  inline-block pb-2">
                  <img
                    className="h-10 w-11 rounded-full"
                    src={activeContact.img}
                  ></img>
                </div>
                <div className="border-white w-full leading-tight ml-2 mt-0.5 text-white flex justify-between">
                  <div>
                    <h1 className="font-bold font-sm ">{activeContact.name}</h1>
                    <h3 className="font-sm">{activeContact.lastSeen}</h3>
                  </div>
                  <div className="flex gap-3 mt-2 w-27 text-sm ">
                    <Phone className="cursor-pointer" />
                    <Video className="cursor-pointer" />
                    <Info className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className=" h-134 flex pt-121">
                <div className="flex p-3 gap-3 text-white ">
                  <Image className="h-5 w-5  cursor-pointer" />
                  <Mic className="h-5 w-5  cursor-pointer" />
                  <FileText className="h-5 w-5  cursor-pointer" />
                </div>
                <div className="search-bar p-3">
                  <form>
                    <input
                      className="w-100 pl-3 h-10 relative bottom-3 right-2  bg-white rounded-full"
                      type="text"
                      placeholder="Type a message..."
                    ></input>
                  </form>
                </div>
                <div className="flex">
                  <button className=" cursor-pointer">
                    <Send
                      size={28}
                      className="text-black font-sm relative bottom-2 right-3 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
  )
}

export default ChatArea
