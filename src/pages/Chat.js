import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'



function Chat({roomName, userName, isLoggedIn}) {

    //DONE: check if user is logged in (get a prop isLoggedIn from App if false Redirect to LogIn )
    //check state for a room if false redirect to create a room then 
    //come back here i think idk shit to complex  i want backend stuff :( °~°
    //pass users and room name to SideBar
    const [users, setUsers] = useState([])

    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }
    if(!roomName){
        return <Redirect to='/newroom' />
    }
    
    return (
        <div className='relative h-full flex bg-gray-200' >
            <SideBar roomName={roomName} users={users} />
            <ChatBox roomName={roomName} userName={userName} setUsers={setUsers} />
        </div>
    )
}

export default Chat
