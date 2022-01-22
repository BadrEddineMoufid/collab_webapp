import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewRoom({setRoomName, isLoggedIn, setType, type}) {
	const  [roomType, setRoomType] = useState(1)
	const history = useHistory()

	
	// video chat : 0
	// chat room : 1 
	// default : 1 / video

	//TODO: URGENT check type state when component first render 
	
	const handleChange = (e) =>{
		
		console.log(e.target.value);

		setRoomType(e.target.value);

	}

	const handleSubmitChat = (e)=>{
		e.preventDefault();
	
		let room = e.target.elements.chat_room_name.value.trim();
		
		//check room name length
		if(room.length < 4 ){

			toast.error("Room Name must be at least 4 Characters", {position:"bottom-center", autoClose: 2000, pauseOnHover: false})
		
		}else{

			//check room type and redirect accordinlly 
			if(roomType === 0){
				console.log('room type: video chat ');
				
				setRoomName(room)
				setType('video')
				
				
				history.push('/videoChat')

			}if( roomType === 1){
				console.log('room type: text chat');
				
				setRoomName(room)
				setType('chat')
				
				history.push('/chat')
			}

		
		}
			

		
	}
	

	
	if(!isLoggedIn){
		return <Redirect to='/login'/>
	}


	//TODO: use dropdown for room type 
	return (
		<div className="flex justify-around mb-4" >
			<div className="flex flex-col justify-center items-center text-center mt-20 p-16 bg-deep-cerulean-700 text-white" >
				<form onSubmit={handleSubmitChat} >
					<p className="text-xl font-bold text-center w-full p-4 h-2 mb-10" >Create / Join a  Chat Room</p>
					
					<input 
						id="chat_room_name" 
						type="text" 
						placeholder="Room Name" 
						required 
						className="text-sm text-black w-full mr-3 py-5 px-4 h-2  rounded mb-4" 
					/>
					
					<select className='text-center text-black p-2 flex flex-col w-full justify-center' onChange={handleChange} >
						<option value="1">Text Chat </option>
						<option value="0">Video Chat </option>
					</select>



					<button type='submit' className="bg-white w-full py-2 px-4 mt-4 text-sm text-black rounded border transform hover:scale-110 " >Join Room</button>
				
				
				</form>
			</div>

			{/* <div className="flex flex-col justify-center items-center mt-20 p-16 bg-deep-cerulean-700 text-white" >
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
			</div> */
			}


		</div>
	)
}
