import React from 'react'
import SideBar from '../components/SideBar'

function Chat() {

    //TODO: check if user is signin (get a prop isLoggedIn from App if false Redirect to LogIn )
    //check state for a room if false redirect to create a room then 
    //come back here i think idk shit to complex for me i want backend stuff :( °~°
    //pass users and room name to SideBar
    return (
        <div className='relative min-h-screen flex' >
            <SideBar roomName="room one" users={['user 1', 'user 2','user 3']} />
        </div>
    )
}

export default Chat
