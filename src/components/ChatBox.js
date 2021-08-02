import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'


const socket = io(process.env.REACT_APP_SOCKET_BASE_URL)

export default function ChatBox({userName, roomName, setUsers, users}) {
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')

    //TODO: setup the disconnect button in nav bar and display users to side bar

    useEffect(() => {
        socket.emit('joinRoom', {username:userName, room:roomName}) 

    },[])

    useEffect(()=>{
        //message from server
        socket.on('message', data=>{
            console.log('message from server: ',data)

            setChat([...chat,data])
        })

        socket.on('roomUsers', data =>{
            console.log(data)
        })
    })
    
    

    const handlSubmit = e=>{
        e.preventDefault()

        //console.log("handle submit: ", message)

        socket.emit('chatMessage', message.trim())
    }

    return (
        <div className='h-screen w-full bg-gray-200'>
            <div className="overflow-auto h-2/3 p-4 m-4 overflow-y-auto" >
                {
                    chat.map((chat,i)=>{
                        return ( 
                            <div key={i}>
                                <h3 className='m-6'  > {chat.text} </h3>
                                <span  > {chat.time} </span>
                                <span  > {chat.username} </span>

                            </div>
                        )
                    })
                }

            </div>
            

            <form className='text-black static ' onSubmit={handlSubmit}   >
                <input id='chatInput'
                    onChange={e =>{setMessage(e.target.value )}}
                    required
                    className="ml-4 mr-4 absolute bottom-20 lef-0 sm:w-1/3 md:w-2/3 p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm" type="text" />
                <button className=' absolute bottom-20 right-0 ml-3 mr-8 bg-deep-cerulean-600 py-2 px-4 text-sm text-white  rounded border' >Send Message</button>
            </form>
        </div>
    )
}
