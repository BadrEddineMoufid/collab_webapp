import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';

export default function NewRoom({setRoomName}) {

    const [redirect, setRedirect] = useState(false)

    const handlSubmit = (e)=>{
        e.preventDefault();
        
        let room = e.target.elements.room_name.value;
        
        setRedirect(true)
        setRoomName(room)
        

        //console.log(e.target.elements.room_name.value)
    }

    if(redirect){
        return <Redirect to='/chat' />
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20 p-10" >
           <form onSubmit={handlSubmit} >
                <p 
                       className="text-xl text-gray-base w-full 
                              ml-10 py-5 px-4 h-2  mb-8" >Enter Room Name</p>

                <input  id="room_name"type="text" placeholder="Room Name" required
                       className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2" />
  
                <button  className="bg-deep-cerulean-700 w-full py-2 px-4 text-sm text-white rounded border " >Join Room</button>
            </form>
        </div>
    )
}
