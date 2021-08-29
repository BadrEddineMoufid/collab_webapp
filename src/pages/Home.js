import React from 'react'
import Card from '../components/Card'
import i from '../images/c1.png'
import img2 from '../images/Mentor.png'
import img3 from '../images/WFH.png'


//DONE:change cards images
//TODO:display more details like how the app works and stuff


export default function  Home() {
	
	return (
      
    <div className="md:h-full lg:h-screen p-12 bg-gray-200">
      <div className="grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-4  lg:grid-cols-3 lg:gap-6">
        <Card title="Create Rooms " content="Create Rooms with your team and collaborate on project that matters to you" image={img3} />
        <Card title="Chat & Video Chat With Your Team" content="Chat with your team members and get things done faster and easier " image={img2} />
        <Card title="Share Files With Your Team" content="Share with your team your files for a better experience " image={i} />
      </div>
    </div>
    
  
  )
}



