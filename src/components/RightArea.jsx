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

function RightArea() {
     const [activeContact, setActiveContact] = useState(contacts[0]);
  return (
   <div className="border border-white rounded-r-2xl w-60 p-5 mb-0 ">
          <div className=" h-45 flex flex-col gap-3 justify-center items-center">
            <img
              className="rounded-full h-30 w-30"
              src={activeContact.img}
            ></img>
            <div className="text-center text-white text-xl font-bold">
              <h4>{activeContact.name}</h4>
              <h6 className='text-sm text-green-500'>Active Now</h6>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            <div className="h-full">
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-47 pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Set up a chat{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-47 pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className=" text-white opacity-100 font-bold text-sm">
                  Privacy & Help
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-47 pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Shared Files{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-47 pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Shared Photos{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
  )
}

export default RightArea
