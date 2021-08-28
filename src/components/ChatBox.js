import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'


let socket; 
const ENDPOINT = process.env.REACT_APP_SOCKET_BASE_URL;

export default function ChatBox({userName, roomName, setUsers}) {
	const [chat, setChat] = useState([])
	const [message, setMessage] = useState('')
	const chatEndRef = useRef(null)

	//DONE: display users to side bar
	// use useRef since it's completely seprate from component render cycle
	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('joinRoom', {username:userName, room:roomName}) 
		
		//close socket connection on component unmout 
		//useEffect return function executes on component unmout if the dependecy array is emty
		return () =>{
			socket.close();
		}
	},[])

	useEffect(()=>{
		//message from server
		socket.on('message', data=>{
			//console.log('message from server: ',data)

			setChat(chat =>[...chat, data])
		})
		socket.on('roomUsers', data =>{
			//console.log(`room users res:`)
			//console.log(data)
			setUsers(data.users);
		})
		
	}, [])
	

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat]);
	

	const handlSubmit = e=>{
		e.preventDefault()

		//console.log("handle submit: ", message)

		socket.emit('chatMessage', {username: userName,text:message.trim(), roomname:roomName})

		e.target.elements.chatInput.value = ''

		///setMessage('')
	}

	return (
		<div className='h-screen w-full bg-gray-200 '>
			<div className=" h-2/3 p-4 m-4 overflow-y-scroll  relative" >
				{
					chat.map((chat,i)=>{
						return ( 
							
							chat.username === 'COLLAB_BOT' ? 
							<div className="bg-white rounded-md  left-0 shadow-md m-4 text-black w-2/3 relative" key={i}>
								
								<h3 className='m-6 inline-block '  > {chat.text} </h3>
								<span className='absolute bottom-2 right-0 text-xs mr-8' > {chat.time} </span>
								<span className='absolute bottom-2 right-20 text-xs mr-3' > {chat.username} </span>
							
							</div>
							: 
							chat.username === userName 
							?
							<div className="  right-0 bg-green-500 rounded-md shadow-md m-4 text-white w-2/3 relative " key={i}>
								
								<h3 className='m-6 inline-block '  > {chat.text} </h3>
								<span className='absolute bottom-2  right-0 text-xs mr-8' > {chat.time} </span>
								<span className='absolute bottom-2  right-20 text-xs mr-3' > {chat.username} </span>
							
							</div>
							:  
							<div className="bg-blue-500  left-0 rounded-md shadow-md m-4 text-white w-2/3 relative " key={i}>
								
								<h3 className='m-6 inline-block '  > {chat.text} </h3>
								<span className='absolute bottom-2 right-0 text-xs mr-8' > {chat.time} </span>
								<span className='absolute bottom-2 right-20 text-xs mr-3' > {chat.username} </span>
							
							</div>
						)
					})
				}
				<div ref={chatEndRef} className="bg-blue-500  left-0 rounded-md shadow-md m-4 text-white w-2/3 relative ">
				</div>


			</div>
			

			<form className='text-black static ' onSubmit={handlSubmit}   >
				<input id='chatInput'
					onChange={e =>{setMessage(e.target.value )}}
					required
					className="ml-4 mr-4 absolute bottom-20 lef-0 sm:w-1/3 md:w-2/3 p-2 text-black border-2 border-gray-300 rounded-md outline-none text-sm" type="text" />
				<button className=' absolute bottom-20 right-0 ml-3 mr-8 bg-deep-cerulean-600 p-2 text-sm text-white  rounded border' >Send Message <img alt='send icon' className="inline-block" src="https://img.icons8.com/material-rounded/24/FFFFFF/filled-sent.png"/></button>
			</form>
		</div>
	)
}
