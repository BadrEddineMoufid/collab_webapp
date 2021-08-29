import React from 'react'
import { toast } from 'react-toastify'
import SharedFiles from './SharedFiles'
import UserList from './UserList'

export default function SideBar({roomName, users}) {

	const handleCopyRoomName = () =>{
		toast.info(`Copied Room Name to clipboard   ${roomName}`, {position:'top-right',autoClose: 2000, pauseOnHover: false} )
		navigator.clipboard.writeText(roomName)
	}

	return (
		<div className='bg-deep-cerulean-700 w-64 mt-2 mb-2 ml-1 p-2 ' >
			
			<p className='text-font-bold text-xl text-white mb-2' >Room Name : </p>

			<div className='flex justify-between'>
				<span className='text-font-bold text-xl ml-4 text-white ' >🚪 {roomName} </span>
				<img alt='copy icon' className='cursor-pointer ' onClick={handleCopyRoomName} src="copy-icon.png"/>
			</div>
		

			<p className='text-font-bold text-xl text-white mt-2' >Users : </p>
			<UserList users={users} />
			
			<p className='text-font-bold text-xl text-white mt-2' >Shared Files : </p>
			<SharedFiles roomName={roomName} />
			
		</div>
	)
}
