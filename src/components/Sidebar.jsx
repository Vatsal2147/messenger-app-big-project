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

function Sidebar() {
     const [activeContact, setActiveContact] = useState(contacts[0]);
  return (
   <div className="left">
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
                 className="p-3 text-sm text-white border-1 border-white w-41 h-10 rounded-sm"
               ></input>
             </form>
             <div className="mt-3 flex flex-col gap-1 h-full ">
               {contacts.map((contact) => (
                 <div
                   key={contact.id}
                   onClick={() => setActiveContact(contact)}
                   className={`cursor-pointer hover:opacity-80 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5 ${
                     activeContact.id === contact.id ? "bg-red-500" : ""
                   }`}
                 >
                   <img
                     className="rounded-full h-10 w-10 object-cover"
                     src={contact.img}
                   ></img>
                   <h1 className="ml-10 text-white">{contact.name}</h1>
                 </div>
               ))}
             </div>
           </div>
  )
}

export default Sidebar
