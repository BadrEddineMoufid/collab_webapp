import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function NavBar({loggedIn, userName, setRoomName, roomName}) {
	const history = useHistory()

	//empty roomName in App state and redirect user to home 
	const handleLeaveRoom = (e) =>{
		setRoomName('')
		history.push('/')
	}


  ///get a prop islogedin if true render home link and room link else render default nav 
	return (
		<nav className="bg-deep-cerulean-700 shadow-lg sticky top-0 z-50">
			<div className="sm:flex justify-between">
					
				<Link className="text-white text-3xl  font-bold p-3 no-underline " to='/' >Collab WebApp</Link>
				
				<ul className="text-white sm:self-center text-xl border-t sm:border-none">
					<li className="sm:inline-block  transform  hover:scale-110">
							<Link className="p-3 font-normal  " to="/" >Home</Link>
					</li>
					{ 
						loggedIn && roomName.length > 1 ?

						<React.Fragment>
							<li className="sm:inline-block font-thin p-3" > 👤 {userName} </li>
							<li className="sm:inline-block font-normal cursor-pointer p-3 transform hover:scale-110 " onClick={handleLeaveRoom} > Leave Room </li>
						</React.Fragment>
						
						:
						
						loggedIn && roomName === '' ?
						
						<React.Fragment>
							<li className="sm:inline-block  transform  hover:scale-110">
								<Link className="p-3 font-normal " to="/newRoom">Create or Join room </Link>
							</li> 
							<li className="sm:inline-block font-thin p-3" > 👤 {userName} </li>
						
						</React.Fragment>
						
						:

						!loggedIn ?
						<>
							<Link className="sm:inline-block p-3 font-normal transform  hover:scale-110" to="/login" >Log In</Link>
							<Link className="sm:inline-block p-3 font-normal transform  hover:scale-110" to="/signup" >Sign Up</Link>
						</> 
						:
						<></>
						 
					}
					
				</ul>
			</div>
		</nav>
  )
}



