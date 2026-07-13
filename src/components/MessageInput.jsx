import { Image, Mic, FileText, Send } from "lucide-react";

export default function MessageInput({ value, onChange, onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="flex items-center w-full px-2 pb-2">
      <div className="flex p-3 gap-3 text-white ">
        <Image className="h-5 w-5  cursor-pointer" />
        <Mic className="h-5 w-5  cursor-pointer" />
        <FileText className="h-5 w-5  cursor-pointer" />
      </div>
      <div className="search-bar p-3 flex-1">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full pl-3 h-10 bg-white rounded-full"
            type="text"
            placeholder="Type a message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          ></input>
        </form>
      </div>
      <div className="flex">
        <button className=" cursor-pointer" onClick={onSend}>
          <Send size={28} className="text-black font-sm rounded-full" />
        </button>
      </div>
    </div>
  );
}