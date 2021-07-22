import React from 'react'
import Card from '../components/Card'


//TODO:change cards images
//TODO:display more details like how the app works and stuff


export default function home() {

  return (
      
    <div className="h-screen p-12 bg-gray-200">
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Create Rooms " content="Create Rooms with your team and collaborate on project that matters to you" image="https://dummyimage.com/720x400/F3F4F7/8693ac" />
        <Card title="Chat With Your Team" content="Chat with your team members and get things done faster and easier " image="https://dummyimage.com/720x400/F3F4F7/8693ac" />
        <Card title="Video Chat With Your Team" content="Need to have more serious conversations or just a face to face with your team mates video chat them" image="https://dummyimage.com/720x400/F3F4F7/8693ac" />
      </div>
    </div>
    
  
  )
}
