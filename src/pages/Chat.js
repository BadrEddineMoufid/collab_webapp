import React, {useState} from 'react'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'



function Chat({roomName, userName, isLoggedIn}) {

    //TODO: check if user is logged in (get a prop isLoggedIn from App if false Redirect to LogIn )
    //check state for a room if false redirect to create a room then 
    //come back here i think idk shit to complex for me i want backend stuff :( °~°
    //pass users and room name to SideBar
    const [users, setUsers] = useState([])
    
    return (
        <div className='relative min-h-screen flex' >
            <SideBar roomName={roomName} users={users} />
            <ChatBox roomName={roomName} userName={userName} setUsers={setUsers} users={users} />
        </div>
    )
}

export default Chat
