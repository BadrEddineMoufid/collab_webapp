import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'


const socket = io(process.env.REACT_APP_SOCKET_BASE_URL)

export default function ChatBox({userName, roomName, setUsers, users}) {
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')


    useEffect(() => {
        socket.on('message', payload =>{
            console.log("message recieved from server: ", payload)
            if(payload.roomName === roomName){
                setChat([...chat,payload]);
                if(userName !== payload.userName){
                    setUsers([payload.userName])
                }

            }

        })   
    })
    

    const handlSubmit = e=>{
        e.preventDefault()
        console.log("handle submit: ", message)

        socket.emit('chatMessage', {message, userName, roomName})
    }

    return (
        <div className='h-screen w-full bg-gray-200'>
            <div className="overflow-auto h-2/3 p-4 m-4" >
                {chat.map((p,i)=>{
                    return (<h3 className='m-6' key={i} >{p.message}</h3>)
                })
                }

            </div>
            

            <form className='text-black static ' onSubmit={handlSubmit}   >
                <input id='chatInput'
                    onChange={e =>{setMessage(e.target.value)}}
                    required
                    className="ml-4 absolute bottom-20 lef-0 sm:w-1/3 md:w-2/3 p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm" type="text" />
                <button className=' absolute bottom-20 right-0 mr-8 bg-deep-cerulean-600 py-2 px-4 text-sm text-white  rounded border' >Send Message</button>
            </form>
        </div>
    )
}
