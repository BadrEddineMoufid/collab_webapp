import React from 'react'
import SharedFiles from './SharedFiles'
import UserList from './UserList'

export default function SideBar({roomName, users}) {
    return (
        <div className='bg-deep-cerulean-700 w-64 mt-2 mb-2 ml-2 p-4' >
            
            <p className='text-font-bold text-xl text-white mb-4' >Room Name : </p>
            <span className='text-font-bold text-xl ml-4 text-white ' >{roomName} </span>

            <p className='text-font-bold text-xl text-white mt-6' >Users : </p>
            <UserList users={users} />
            <p className='text-font-bold text-xl text-white mt-6' >Shared Files : </p>

            <SharedFiles roomName={roomName} />
            
        </div>
    )
}
