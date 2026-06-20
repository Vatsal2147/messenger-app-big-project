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
  { id: 2, name: "Contact 2", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
  { id: 3, name: "Contact 3", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
  { id: 4, name: "Contact 4", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
  { id: 5, name: "Contact 5", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
  { id: 6, name: "Contact 6", img: CONTACT_IMG, lastSeen: "Last seen yesterday 10:53pm" },
];

function App() {
  const [activeContact, setActiveContact] = useState(contacts[0]);

  return (
    <div className="parent">
      <div className="parent1">
        <div className="left flex-shrink-0 h-full flex flex-col">
          <div className="btn">
            <button className="bg-red-600 mr-2 "> </button>          
            <button className="bg-amber-300 mr-2"> </button>
            <button className="bg-green-500 mr-2"> </button>
          </div>
          <div className="flex justify-between h-10 mt-2 mb-2">
            <div>
              <h1 className='text-white font-bold text-lg'>Chats</h1>
            </div>
            <div className="flex gap-2 h-18 w-18 cursor-pointer">
              <Ellipsis />
              <Maximize2 />
              <SquarePen />
            </div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Search"
              className="p-3 text-sm text-white border-1 border-white w-full h-10 rounded-sm"
            ></input>
          </form>
          <div className="mt-3 flex flex-col gap-1 flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`cursor-pointer hover:bg-red-500 border-1 border-white w-full rounded-sm flex items-center gap-3 h-[3.75em] px-2 ${
                  activeContact.id === contact.id ? "bg-red-500" : ""
                }`}
              >
                <img
                  className="rounded-full h-10 w-10 object-cover flex-shrink-0"
                  src={contact.img}
                ></img>
                <h1 className="text-white truncate">{contact.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="border-1 border-white flex-1 h-full flex flex-col">
          <div className="border-1 border-white w-full h-[8%] min-h-[60px] pt-3 pl-3 pb-2 flex">
            <div className="border-white  inline-block pb-2">
              <img
                className="h-[2.5em] w-[2.75em] rounded-full"
                src={activeContact.img}
              ></img>
            </div>
            <div className="border-white w-full leading-tight ml-2 mt-0.5 text-white flex justify-between">
              <div>
                <h1 className="font-bold font-sm ">{activeContact.name}</h1>
                <h3 className="font-sm">{activeContact.lastSeen}</h3>
              </div>
              <div className="flex gap-3 mt-2 text-sm mr-3 ">
                <Phone className="cursor-pointer" />
                <Video className="cursor-pointer" />
                <Info className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* messages will go here */}
          </div>
          <div className="flex items-center w-full px-2 pb-2">
            <div className="flex p-3 gap-3 text-white ">
              <Image className="h-5 w-5  cursor-pointer" />
              <Mic className="h-5 w-5  cursor-pointer" />
              <FileText className="h-5 w-5  cursor-pointer" />
            </div>
            <div className="search-bar p-3 flex-1">
              <form>
                <input
                  className="w-full pl-3 h-10 bg-white rounded-full"
                  type="text"
                  placeholder="Type a message..."
                ></input>
              </form>
            </div>
            <div className="flex">
              <button className=" cursor-pointer">
                <Send
                  size={28}
                  className="text-black font-sm rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="border border-white rounded-r-2xl flex-shrink-0 w-[20%] min-w-[200px] p-5 mb-0 flex flex-col">
          <div className="flex flex-col gap-3 justify-center items-center py-[5%]">
            <img
              className="rounded-full h-[6em] w-[6em]"
              src={activeContact.img}
            ></img>
            <div className="text-center text-white text-xl font-bold">
              <h4>{activeContact.name}</h4>
              <h6 className='text-sm text-green-500'>Active Now</h6>
            </div>
          </div>

          <div className="flex justify-between items-center mt-[8%]">
            <div className="w-full">
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Set up a chat{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className=" text-white opacity-100 font-bold text-sm">
                  Privacy & Help
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Shared Files{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
              <button className="flex items-center justify-between text-white border-white/30 border-t border-b w-full pt-3 pb-3 text-left hover:bg-red-600 cursor-pointer">
                <h4 className="text-white opacity-100 font-bold text-sm">
                  Shared Photos{" "}
                </h4>
                <ChevronDown size={28} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;