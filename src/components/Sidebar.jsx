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

function Sidebar() {
  return (
    <div className="left">
          <div className="btn">
            <button className="bg-red-600 mr-2 cursor-pointer"> </button>          
            <button className="bg-amber-300 mr-2 cursor-pointer"> </button>
            <button className="bg-green-500 mr-2 cursor-pointer"> </button>
          </div>
          <div className="flex justify-between h-10 mt-2 mb-2">
            <div>
              <h1 className='text-white font-bold text-lg'>Chats</h1>
            </div>
            <div className="flex gap-2 h-18 w-18 cursor-pointer">
              <Ellipsis className='cursor-pointer' />
              <Maximize2 className='cursor-pointer' />
              <SquarePen className='cursor-pointer' />
            </div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Search"
              className="p-3 text-sm text-white border-1 border-white w-42.5 h-10 rounded-sm"
            ></input>
          </form>
          <div className="mt-3 flex flex-col gap-1 h-full ">
            <div className=" cursor-pointer hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 1</h1>
            </div>
            <div className="  cursor-pointer hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 2</h1>
            </div>
            <div className="  cursor-pointer hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 3</h1>
            </div>
            <div className="  cursor-pointer hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 4</h1>
            </div>
            <div className=" cursor-pointer  hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 5</h1>
            </div>
            <div className="  cursor-pointer hover:bg-red-500 border-1 border-white w-100% rounded-sm flex items-center flex-end h-15 pl-1.5">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
              ></img>
              <h1 className="ml-10 text-white">Contact 6</h1>
            </div>
          </div>
        </div>
  )
}

export default Sidebar
