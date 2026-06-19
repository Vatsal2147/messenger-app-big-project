import React from 'react'
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

function RightArea() {
  return (
   <div className="border border-white rounded-r-2xl w-60 p-5 mb-0 ">
          <div className=" h-45 flex flex-col gap-3 justify-center items-center">
            <img
              className="rounded-full h-30 w-30"
              src="data:image/jpeg;base64,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"
            ></img>
            <div className="text-center text-white text-xl font-bold">
              <h4>The Boys</h4>
              <h6 className='text-sm text-green-600'>Active Now</h6>
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
