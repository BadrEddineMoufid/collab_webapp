import React from 'react'

export default function UserList({users}) {

	//this component recives an array of users and displays it
	//console.log(typeof(users))
	//console.log(users)

	return (
		<div>
			<ul className=" mt-2 bg-gray-200 h-60 overflow-auto rounded text-deep-cerulean-700 text-xl border ">
				{	
					users.map((user, i) => 
					
					<li key={i} className="m-2 ">
							👤 {user.username}
					</li>
					)
					
				}
			</ul>
		</div>
	)
}
