import React, {useState, useEffect} from 'react'




export default function ChatBox({userName, roomName, setUsers, socket}) {
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')

    //TODO: setup the disconnect button in nav bar 
    //DONE: display users to side bar

    useEffect(() => {
        socket.emit('joinRoom', {username:userName, room:roomName}) 

        

    },[roomName, userName, socket])

    useEffect(()=>{
        //message from server
        socket.on('message', data=>{
            //console.log('message from server: ',data)

            setChat([...chat, data])
        })

        
    })
    
    useEffect(()=>{
        socket.on('roomUsers', data =>{
            //console.log(data)
            setUsers(data.users);
        })
    }, [socket])

    const handlSubmit = e=>{
        e.preventDefault()

        //console.log("handle submit: ", message)

        socket.emit('chatMessage', {username: userName,text:message.trim()})

        e.target.elements.chatInput.value = ''

        ///setMessage('')
    }

    return (
        <div className='h-screen w-full bg-gray-200'>
            <div className=" h-2/3 p-4 m-4 overflow-y-auto " >
                {
                    chat.map((chat,i)=>{
                        return ( 
                            
                            chat.username === 'COLLAB_BOT' ? 
                            <div className="bg-white rounded-md shadow-md m-4 text-black w-2/3 " key={i}>
                                <div className='' >
                                    <h3 className='m-6 inline-block '  > {chat.text} </h3>
                                    <span className='text-sm' > {chat.time} </span>
                                    <span className='text-sm' > {chat.username} </span>
                                </div>
                            </div>
                            : 
                            <div className="bg-blue-500 rounded-md shadow-md m-4 text-white w-2/3 " key={i}>
                                <div className='' >
                                    <h3 className='m-6 inline-block '  > {chat.text} </h3>
                                    <span className='text-sm' > {chat.time} </span>
                                    <span className='text-sm' > {chat.username} </span>
                                </div>
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
