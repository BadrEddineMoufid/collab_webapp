import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';

export default function NewRoom({setRoomName, isLoggedIn}) {

    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        let room = e.target.elements.room_name.value;
        
        setRoomName(room)
        setRedirect(true)
        

        //console.log(e.target.elements.room_name.value)
    }

    if(redirect){
        return <Redirect to='/chat' />
    }
    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20 p-10" >
           <form onSubmit={handleSubmit} >
                <p className="text-xl font-bold text-center w-full p-4 h-2 mb-8" >Enter Room Name</p>

                <input 
                    id="room_name" 
                    type="text" 
                    placeholder="Room Name" 
                    required 
                    autoFocus
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2" 
                />
  
                <button  className="bg-deep-cerulean-700 w-full py-2 px-4 text-sm text-white rounded border " >Join Room</button>
            </form>
        </div>
    )
}
