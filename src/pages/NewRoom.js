import React from 'react'

export default function NewRoom() {
    return (
        <div className="flex flex-col justify-center items-center mt-20 p-10" >
           <form>
                <p 
                       class="text-xl text-gray-base w-full 
                              ml-10 py-5 px-4 h-2  mb-8" >Enter Room Name</p>
                <input  
                       type="text" placeholder="Room Name"
                       class="text-sm text-gray-base w-full mr-3 
                              py-5 px-4 h-2 border border-gray-200 
                              rounded mb-2" />
  
                <button  className="bg-deep-cerulean-700 w-full py-2 px-4 text-sm text-white rounded border " >Join Room</button>
            </form>
        </div>
    )
}
