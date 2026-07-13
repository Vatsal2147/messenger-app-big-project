import { Ellipsis, Maximize2, SquarePen } from "lucide-react";

export default function Sidebar({ contacts, activeContact, setActiveContact }) {
  return (
    <div className="left flex-shrink-0 h-full flex flex-col">
      <div className="btn">
        <button className="bg-red-600 mr-2 "> </button>
        <button className="bg-amber-300 mr-2"> </button>
        <button className="bg-green-500 mr-2"> </button>
      </div>
      <div className="flex justify-between h-10 mt-2 mb-2">
        <div>
          <h1 className="text-white font-bold text-lg">Chats</h1>
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
  );
}