import React from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewRoom({setRoomName, isLoggedIn, setType, type}) {

	const history = useHistory()
	

	const handleSubmitChat = (e)=>{
		e.preventDefault();
	
		let room = e.target.elements.chat_room_name.value.trim();
		
		if(room.length < 4 ){

			toast.error("Room Name must be at least 4 Characters", {position:"bottom-center", autoClose: 2000, pauseOnHover: false})
		
		}else{

			setRoomName(room)
			setType('chat')

			history.push('/chat')
		
		}
			

		//console.log(e.target.elements.room_name.value)
	}
	const handleSubmitVideoChat = (e)=>{
		e.preventDefault();
	
		let room = e.target.elements.video_room_name.value.trim();
		if(room.length < 4 ){

			toast.error("Room Name must be at least 4 Characters", {position:"bottom-center", autoClose: 2000, pauseOnHover: false})
		
		}else{
			//TODO:setup a room type in state and redirect accordingly

			setRoomName(room)
			setType('video')

			history.push('/videoChat')
			
		}
			

		//console.log(e.target.elements.room_name.value)
	}

	//devotion inspires bravery, bravery inspires sacrifice, sacrifice leads to death 
	
	if(!isLoggedIn){
		return <Redirect to='/login'/>
	}

	return (
		<div className="flex justify-around mb-4" >
			<div className="flex flex-col justify-center items-center mt-20 p-16 bg-deep-cerulean-700 text-white" >
				<form onSubmit={handleSubmitChat} >
				<p className="text-xl font-bold text-center w-full p-4 h-2 mb-10" >Create / Join a  Chat Room</p>

					<input 
						id="chat_room_name" 
						type="text" 
						placeholder="Room Name" 
						required 
						className="text-sm text-black w-full mr-3 py-5 px-4 h-2  rounded mb-10" 
					/>

					<button  className="bg-white w-full py-2 px-4 text-sm text-black rounded border transform hover:scale-110 " >Join Room</button>
				</form>
			</div>

			<div className="flex flex-col justify-center items-center mt-20 p-16 bg-deep-cerulean-700 text-white" >
				<form onSubmit={handleSubmitVideoChat} >
				<p className="text-xl font-bold text-center w-full p-4 h-2 mb-10" >Create / Join a Video Chat Room</p>

					<input 
						id="video_room_name" 
						type="text" 
						placeholder="Room Name" 
						required 
						className="text-sm text-black w-full  m-auto  py-5 px-4 h-2  rounded mb-10" 
					/>

					<button  className="bg-white w-full py-2 px-4 text-sm text-black rounded border transform hover:scale-110 " >Join Room</button>
				</form>
			</div>
		</div>
	)
}
