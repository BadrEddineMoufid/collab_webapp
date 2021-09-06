import React, { useState } from 'react'
import { Redirect } from 'react-router'
import SideBar from '../components/SideBar'

export default function VideoChat({roomName, userName, isLoggedIn}) {

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
			
		</div>
	)
}
